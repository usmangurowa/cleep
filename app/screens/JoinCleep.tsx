import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import tw from "../twrnc";
import { SafeAreaView } from "../components";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  withTheme,
} from "react-native-paper";
import { useLoading } from "../hooks";
import { checkSession } from "../api/sessions";
import { useStore } from "../context";
import { Actions } from "../context/reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import routes from "../navigations/routes";

const JoinCleep = () => {
  const [permissionResponse, requestPermission] =
    BarCodeScanner.usePermissions();
  const [scanned, setScanned] = React.useState<boolean>(false);
  const [sessionId, setSessionId] = React.useState<string>("");
  const [signInKey, setSignInKey] = React.useState<string>("");
  const [secureText, setSecureText] = React.useState<boolean>(true);
  const { isLoading, start, stop } = useLoading();
  const { dispatch, state } = useStore();
  const [message, setMessage] = React.useState<string>("");

  const navigation: NavigationProp<any> = useNavigation();

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setSessionId(data);
  };

  const handleJoinCleep = () => {
    start();
    checkSession({
      session_id: sessionId.split("=")[1],
      signing_key: signInKey,
    })
      .then((res: any) => {
        setMessage(res?.message);
        dispatch({
          type: Actions.CREATE_SESSION,
          payload: { sessionId: sessionId.split("=")[1], signInKey: signInKey },
        });
      })
      .catch((err) => {
        setMessage(err.message);
        stop();
      });
  };

  React.useEffect(() => {
    if (permissionResponse?.status !== "granted") {
      requestPermission();
    }
  }, []);

  React.useEffect(() => {
    if (state.hasSession) {
      navigation.navigate(routes.MAIN_NAVIGATION.HOME.CLEEP_LIST);
    }
  }, [state.hasSession]);

  return (
    <>
      <SafeAreaView>
        {scanned ? (
          <>
            <View style={tw`flex items-center my-10 w-full container`}>
              <Image
                source={require("../assets/icon.png")}
                style={tw`w-20 h-20 rounded-xl my-5`}
              />
              <Text style={tw`text-center`} variant="bodyMedium">
                Enter a signing key to join the Cleep session.
              </Text>
              <TextInput
                theme={{ roundness: 10 }}
                mode="outlined"
                value={signInKey}
                onChangeText={setSignInKey}
                style={tw`w-full my-5 py-2`}
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
                onPress={handleJoinCleep}
                contentStyle={tw`py-3`}
                style={tw`w-full`}
                mode="contained"
                loading={isLoading}
              >
                Join
              </Button>
            </View>
          </>
        ) : (
          <>
            {permissionResponse?.status === "granted" ? (
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            ) : (
              <Text>Requesting for camera permission...</Text>
            )}
          </>
        )}
      </SafeAreaView>
      <Snackbar visible={Boolean(message)} onDismiss={() => setMessage("")}>
        {message}
      </Snackbar>
    </>
  );
};

export default withTheme(JoinCleep);
