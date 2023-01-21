import { View, Share, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../twrnc";
import {
  ActivityIndicator,
  Button,
  Headline,
  Text,
  withTheme,
} from "react-native-paper";
import SafeAreaView from "./SafeAreaView";
import { FAB, Badge } from "react-native-paper";
import { MasonryFlashList } from "@shopify/flash-list";
import constants from "../constants";
// import QRCode from "react-native-qrcode-svg";
import { io } from "socket.io-client";

import { getCleeps } from "../api/cleeps";
import storage from "../storage";
import { useStore } from "../context";
import { useLoading } from "../hooks";
import { Actions } from "../context/reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import routes from "../navigations/routes";

const Cleeps = () => {
  const session = JSON.parse(storage.getString("session") || "{}");
  const [open, setOpen] = React.useState<boolean>(false);
  const { isLoading, start, stop } = useLoading();
  const { dispatch, state } = useStore();
  const [cleeps, setCleeps] = React.useState<any[]>([]);
  const navigation: NavigationProp<any> = useNavigation();

  const onShare = async () => {
    Share.share({
      url: `https://cleep.app/connect?sessionID=${session.sessionId}`,
      message: `https://cleep.app/connect?sessionID=${session.sessionId}`,
      title: "Cleep Session",
    });
  };

  React.useEffect(() => {
    start();
    getCleeps()
      .then((res: any) => {
        setCleeps(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => stop());
  }, []);

  React.useEffect(() => {
    const socket = io(`https://api.cleep.app`, {
      autoConnect: true,
      transports: ["websocket", "polling"],

      reconnectionAttempts: 3,
      query: {
        session_id: session.sessionId,
        signing_key: session.signInKey,
      },
    });

    socket.connect();

    socket.on("connect", () => {
      dispatch({ type: Actions.ON_CONNECT });
    });

    socket.on("new_cleep", (incomingData: DocumentType) => {
      const containsData = cleeps.find((item) => item.id == incomingData.id);
      if (!containsData) {
        setCleeps((prev) => [incomingData, ...prev]);
      }
    });
    socket.on("connect_error", (err) => {
      console.log(err);
    });

    return () => {
      socket.disconnect();
      dispatch({ type: Actions.ON_DISCONNECT });
    };
  }, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`p-2 flex flex-row items-center justify-between`}>
        <Headline style={tw`font-bold`}>Cleep</Headline>
        <View
          style={tw`p-2 rounded-lg dark:bg-white dark:bg-opacity-20 bg-black/20`}
        >
          <Badge
            style={tw`bg-${state.isConnected ? "success" : "error"}`}
            size={20}
          />
        </View>
      </View>
      {isLoading ? (
        <View style={tw`flex-1 items-center justify-center h-[80vh] container`}>
          <ActivityIndicator size={"large"} color={tw.color("primary")} />
        </View>
      ) : (
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
                }] bg-opacity-20 dark:bg-opacity-30 w-full p-2 rounded-md`}
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
                below if you are unable to scan it. You will need your signing
                key to connect.
              </Text>
              {/* <QRCode value="http://awesome.link.qr" />| */}

              <Text
                onPress={onShare}
                style={tw`text-center font-bold text-primary m-5`}
              >
                https://cleep.app/connect?sessionID={session.sessionId}
              </Text>
            </View>
          )}
        />
      )}

      <FAB.Group
        style={tw``}
        fabStyle={tw`rounded-full`}
        open={open}
        visible
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Text",
            onPress: () =>
              navigation.navigate(routes.MAIN_NAVIGATION.HOME.ADD_CLEEP),
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
