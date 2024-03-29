import { View, TextInput } from "react-native";
import React from "react";
import { Header, SafeAreaView } from "../components";
import tw from "../twrnc";
import { FAB, Snackbar, withTheme } from "react-native-paper";
import { useStore } from "../context";
import * as Clipboard from "expo-clipboard";
import { createCleep } from "../api/cleeps";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import routes from "../navigations/routes";
import { useLoading } from "../hooks";

const AddCleep = () => {
  const navigation: NavigationProp<any> = useNavigation();
  const { state } = useStore();
  const [content, setContent] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const { isLoading, start, stop } = useLoading();
  const handleFABPress = async () => {
    if (content) {
      // save cleep
      start();
      createCleep(content)
        .then((res: any) => {
          stop();
          setMessage(res?.message);
          navigation.navigate(routes.MAIN_NAVIGATION.HOME.CLEEP_LIST);
        })
        .catch((err) => {
          stop();
          setMessage(err?.message);
        });
    } else {
      // paste from clipboard
      const text = await Clipboard.getStringAsync();
      setContent(text);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 justify-between`}>
      <Header title="Add Cleep" />
      <TextInput
        multiline
        value={content}
        onChangeText={setContent}
        style={tw`h-full p-4 pb-20 dark:text-white text-black`}
        placeholder="Write or paste Cleep..."
        placeholderTextColor={tw.color(
          state.theme === "dark" ? "white/50" : "black/50"
        )}
        textAlignVertical="top"
      />

      <FAB
        style={tw`absolute bottom-0 right-0 m-5 rounded-full`}
        icon={content ? "content-save-outline" : "content-paste"}
        onPress={handleFABPress}
        loading={isLoading}
      />
      <Snackbar
        visible={Boolean(message)}
        onDismiss={() => setMessage("")}
        action={{
          icon: "close",
          onPress: () => setMessage(""),
          label: "Close",
        }}
      >
        {message}
      </Snackbar>
    </SafeAreaView>
  );
};

export default withTheme(AddCleep);
