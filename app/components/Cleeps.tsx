import { View, Share } from "react-native";
import React from "react";
import tw from "../twrnc";
import { Button, Headline, Text, withTheme } from "react-native-paper";
import SafeAreaView from "./SafeAreaView";
import { FAB, Badge } from "react-native-paper";
import { MasonryFlashList } from "@shopify/flash-list";
import constants from "../constants";
// import QRCode from "react-native-qrcode-svg";
import { io } from "socket.io-client";

import { getCleeps } from "../api/cleeps";
import storage from "../storage";

const Cleeps = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [cleeps, setCleeps] = React.useState<any[]>([]);
  const session = JSON.parse(storage.getString("session") || "");

  const onShare = async () => {
    Share.share({
      url: `https://cleep.app/connect?sessionID=${session.sessionId}`,
      message: `https://cleep.app/connect?sessionID=${session.sessionId}`,
      title: "Cleep Session",
    });
  };

  React.useEffect(() => {
    getCleeps()
      .then((res: any) => {
        setCleeps(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const session = JSON.parse(storage.getString("session") || "");

    const socket = io(`${constants.BASE_URL}`, {
      autoConnect: true,
      // transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
      query: {
        session_id: session.sessionId,
        signing_key: session.signInKey,
      },
    });
    socket.connect();
    socket.on("connect", (data: any) => {
      console.log("connected", data);
    });

    socket.on("new_cleep", (incomingData: DocumentType) => {
      console.log(incomingData);
      const containsData = cleeps.find((item) => item.id == incomingData.id);
      if (!containsData) {
        setCleeps((prev) => [incomingData, ...prev]);
      }
    });
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 justify-between`}>
      <View style={tw`p-2 flex flex-row items-center justify-between`}>
        <Headline style={tw`font-bold`}>Cleep</Headline>
        <View
          style={tw`p-2 rounded-lg dark:bg-white dark:bg-opacity-20 bg-black/20`}
        >
          <Badge style={tw`bg-success`} size={20} />
        </View>
      </View>
      <MasonryFlashList
        numColumns={2}
        contentContainerStyle={tw``}
        renderItem={({ item }) => (
          <View style={tw`p-2 w-full`}>
            <View
              style={tw`bg-[${
                constants.colors[
                  Math.floor(Math.random() * constants.colors.length)
                ]
              }] bg-opacity-20 dark:bg-opacity-30 w-full p-2 rounded-xl`}
            >
              <Text numberOfLines={5}>{item.content}</Text>
            </View>
          </View>
        )}
        estimatedItemSize={100}
        data={cleeps}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={tw`flex-1 items-center justify-center h-[80vh] container`}
          >
            <Text variant="bodyLarge">No Cleeps</Text>
            <Text style={tw`text-center my-2`}>
              Scan this QR code with your phone to connect or copy the link
              below if you are unable to scan it. You will need your signing key
              to connect.
            </Text>
            {/* <QRCode value="http://awesome.link.qr" />| */}
            <Button
              onPress={onShare}
              mode="text"
              style={tw`text-center my-2 font-bold text-primary w-full`}
            >
              https://cleep.app/connect?sessionID={session.sessionId}
            </Button>
          </View>
        )}
      />

      <FAB.Group
        style={tw``}
        fabStyle={tw`rounded-full`}
        open={open}
        visible
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Text Document",
            onPress: () => console.log("Pressed star"),
            style: tw`rounded-full`,
          },
          {
            icon: "login-variant",
            label: "New Session",
            onPress: () => console.log("Pressed email"),
            style: tw`rounded-full`,
          },
          {
            icon: "devices",
            label: "Add Devices",
            onPress: () => console.log("Pressed notifications"),
            style: tw`rounded-full`,
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </SafeAreaView>
  );
};

export default withTheme(Cleeps);
