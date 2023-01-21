import { View, Share, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../twrnc";
import {
  ActivityIndicator,
  List,
  Headline,
  Snackbar,
  Text,
  withTheme,
  Button,
} from "react-native-paper";
import SafeAreaView from "./SafeAreaView";
import { FAB, Badge } from "react-native-paper";
import { MasonryFlashList } from "@shopify/flash-list";
import constants from "../constants";
import { io } from "socket.io-client";

import { getCleeps } from "../api/cleeps";
import storage from "../storage";
import { useStore } from "../context";
import { useLoading } from "../hooks";
import { Actions } from "../context/reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import routes from "../navigations/routes";
import BottomSheet from "./BottomSheet";

import bottomSheetModal from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal";

import * as Clipboard from "expo-clipboard";

const Cleeps = () => {
  const session = JSON.parse(storage.getString("session") || "{}");
  const [open, setOpen] = React.useState<boolean>(false);
  const { isLoading, start, stop } = useLoading();
  const { dispatch, state } = useStore();
  const [cleeps, setCleeps] = React.useState<any[]>([]);
  const navigation: NavigationProp<any> = useNavigation();
  const [initialFetch, setInitialFetch] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const [activeCleep, setActiveCleep] = React.useState<{
    id: string;
    content: string;
    createAd: string;
  } | null>(null);

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

  const handleCopyCleep = React.useCallback(
    async (content?: string) => {
      await Clipboard.setStringAsync(content || activeCleep?.content || "")
        .then(() => {
          setMessage("Copied to clipboard");
        })
        .catch((err) => {
          setMessage("Cannot copy to clipboard");
        })
        .finally(() => {
          bottomSheetRef.current?.dismiss();
        });
    },
    [activeCleep]
  );

  const handleEditCleep = React.useCallback(() => {
    navigation.navigate(routes.MAIN_NAVIGATION.HOME.EDIT_CLEEP, {
      cleep: activeCleep,
    });
    bottomSheetRef.current?.dismiss();
  }, [activeCleep]);

  const bottomSheetRef = React.useRef<bottomSheetModal>(null);

  React.useEffect(() => {
    if (!initialFetch) {
      start();
      getCleeps()
        .then((res: any) => {
          setCleeps(res.data);
        })
        .catch((err) => {
          setMessage(err?.data?.message);
        })
        .finally(() => stop());
      setInitialFetch(true);
    }
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
      setMessage("Cannot connect to server. Check your internet connection");
    });

    return () => {
      socket.disconnect();
      dispatch({ type: Actions.ON_DISCONNECT });
    };
  }, []);

  React.useEffect(() => {
    if (activeCleep) {
      bottomSheetRef.current?.present();
    }
  }, [activeCleep]);

  return (
    <>
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
          <View
            style={tw`flex-1 items-center justify-center h-[80vh] container`}
          >
            <ActivityIndicator size={"large"} color={tw.color("primary")} />
          </View>
        ) : (
          <MasonryFlashList
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => handleCopyCleep(item.content)}
                onPress={() => setActiveCleep(item)}
                style={tw`p-2 w-full`}
              >
                <View
                  style={tw`bg-[${
                    constants.colors[
                      Math.floor(Math.random() * constants.colors.length)
                    ]
                  }] bg-opacity-20 dark:bg-opacity-30 w-full p-2 rounded-md`}
                >
                  <Text numberOfLines={5}>{item.content}</Text>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={200}
            data={cleeps}
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
                <Text
                  onPress={onShare}
                  style={tw`text-center font-bold text-primary m-5`}
                >
                  https://cleep.app/connect?sessionID={session.sessionId}
                </Text>
                <View style={tw`flex flex-row items-center`}>
                  <Button onPress={onCopy}>Copy Link</Button>
                  <Button onPress={onShare}>Share Link</Button>
                </View>
              </View>
            )}
          />
        )}

        <FAB
          style={tw`rounded-full absolute bottom-0 right-0 m-5`}
          visible
          icon={"plus"}
          onPress={() =>
            navigation.navigate(routes.MAIN_NAVIGATION.HOME.ADD_CLEEP)
          }
        />
      </SafeAreaView>
      <Snackbar
        action={{
          label: "Dismiss",
          onPress: () => setMessage(""),
          icon: "close",
        }}
        visible={Boolean(message)}
        onDismiss={() => setMessage("")}
      >
        {message}
      </Snackbar>
      <BottomSheet
        onDismiss={() => setActiveCleep(null)}
        bottomSheetModalRef={bottomSheetRef}
      >
        <List.Section style={tw`container`}>
          <List.Subheader numberOfLines={1}>
            {activeCleep?.content}
          </List.Subheader>
          <List.Item
            title="Copy Cleep"
            onPress={() => handleCopyCleep()}
            left={() => <List.Icon icon="content-copy" />}
          />
          <List.Item
            title="Edit Cleep"
            onPress={handleEditCleep}
            left={() => <List.Icon icon="note-edit-outline" />}
          />
          <List.Item
            title="Delete Cleep"
            left={() => <List.Icon icon="delete-outline" />}
          />
        </List.Section>
      </BottomSheet>
    </>
  );
};

export default withTheme(Cleeps);
