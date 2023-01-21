import { View, Image } from "react-native";
import React from "react";
import SafeAreaView from "./SafeAreaView";
import tw from "../twrnc";
import { Button, Text, TextInput, Snackbar } from "react-native-paper";
import { createSession } from "../api/sessions";
import { useLoading } from "../hooks";

import { useStore } from "../context";
import { Actions } from "../context/reducer";

const CreateCleep = () => {
  const [signInKey, setSignInKey] = React.useState<string>("");
  const [secureText, setSecureText] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const { isLoading, start, stop } = useLoading();
  const { dispatch } = useStore();

  const handleCreateCleep = () => {
    if (!signInKey) {
      return setError("Signing key is required");
    } else if (signInKey.length < 8) {
      return setError("Signing key must be at least 8 characters");
    } else {
      setError("");
      start();
      createSession(signInKey)
        .then((res: any) => {
          setError("Session created successfully");
          dispatch({
            type: Actions.CREATE_SESSION,
            payload: {
              sessionId: res?.data.session_id,
              signInKey,
              createdAt: new Date().getTime(),
            },
          });
          stop();
        })
        .catch((err) => {
          setError("Error creating session");
          stop();
        });
    }
  };
  return (
    <>
      <SafeAreaView style={tw`flex-1 items-center  container`}>
        <View style={tw`flex items-center my-10 w-full`}>
          <Image
            source={require("../assets/icon.png")}
            style={tw`w-20 h-20 rounded-xl my-5`}
          />
          <Text style={tw`text-center`} variant="bodyMedium">
            Enter a signing key or password, this is used to restrict access to
            your session.
          </Text>
          <TextInput
            value={signInKey}
            onChangeText={setSignInKey}
            style={tw`w-full my-5`}
            placeholder="Enter Signing Key"
            placeholderTextColor={tw.color("gray-400")}
            secureTextEntry={secureText}
            right={
              <TextInput.Icon
                color={"#000"}
                onPress={() => setSecureText(!secureText)}
                icon={secureText ? "eye" : "eye-off"}
              />
            }
          />
          <Button
            onPress={handleCreateCleep}
            contentStyle={tw`py-3`}
            style={tw`w-full`}
            mode="contained"
            loading={isLoading}
          >
            Create
          </Button>
        </View>
      </SafeAreaView>
      <Snackbar
        visible={Boolean(error)}
        onDismiss={() => setError("")}
        action={{
          icon: "close",
          onPress: () => setError(""),
          label: "Close",
        }}
      >
        {error}
      </Snackbar>
    </>
  );
};

export default CreateCleep;
