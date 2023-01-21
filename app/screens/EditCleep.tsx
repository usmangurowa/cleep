import { View, TextInput } from "react-native";
import React from "react";
import { Header, SafeAreaView } from "../components";
import tw from "../twrnc";
import { FAB, Snackbar, withTheme } from "react-native-paper";
import { useStore } from "../context";
import * as Clipboard from "expo-clipboard";
import { createCleep } from "../api/cleeps";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import routes from "../navigations/routes";
import { useLoading } from "../hooks";

const EditCleep = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}) => {
  const { state } = useStore();
  const [content, setContent] = React.useState<string>(
    route.params?.cleep?.content || ""
  );
  const [message, setMessage] = React.useState<string>("");
  const { isLoading, start, stop } = useLoading();

  const handleFABPress = async () => {
    if (content) {
      // update cleep
      setMessage("Updating Cleep is not implemented yet.");
    } else {
      // paste from clipboard
      const text = await Clipboard.getStringAsync();
      setContent(text);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 justify-between`}>
      <Header title="Edit Cleep" />
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
        style={tw`absolute bottom-0 right-0 m-4 rounded-full`}
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

export default EditCleep;
