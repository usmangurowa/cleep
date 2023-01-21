import { View, Share } from "react-native";
import React from "react";
import { Header, SafeAreaView } from "../components";
import tw from "../twrnc";
import { Button, Snackbar, Text, withTheme } from "react-native-paper";
import storage from "../storage";
import * as Clipboard from "expo-clipboard";

const AddDevice = () => {
  const session = JSON.parse(storage.getString("session") || "{}");
  const [message, setMessage] = React.useState<string>("");
  const onShare = async () => {
    Share.share({
      url: `https://cleep.app/connect?sessionID=${session.sessionId}`,
      message: `https://cleep.app/connect?sessionID=${session.sessionId}`,
      title: "Cleep Session",
    });
  };

  const onCopy = async () => {
    await Clipboard.setStringAsync(
      `https://cleep.app/connect?sessionID=${session.sessionId}`
    ).then(() => {
      setMessage("Copied to clipboard");
    });
  };
  return (
    <>
      <SafeAreaView style={tw`flex-1 justify-between`}>
        <Header showBackButton={false} title="Add Device" />
        <View style={tw`flex-1 items-center justify-center h-[80vh] container`}>
          <Text style={tw`text-center my-2`}>
            Scan this QR code with your phone to connect or copy the link below
            if you are unable to scan it. You will need your signing key to
            connect.
          </Text>

          <Text style={tw`text-center font-bold text-primary m-5`}>
            https://cleep.app/connect?sessionID={session.sessionId}
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <Button onPress={onCopy}>Copy Link</Button>
            <Button onPress={onShare}>Share Link</Button>
          </View>
        </View>
      </SafeAreaView>
      <Snackbar
        action={{
          label: "Dismiss",
          onPress: () => setMessage(""),
          icon: "close",
        }}
        visible={!!message}
        onDismiss={() => setMessage("")}
      >
        {message}
      </Snackbar>
    </>
  );
};

export default withTheme(AddDevice);
