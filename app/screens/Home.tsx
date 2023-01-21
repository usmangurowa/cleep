import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

import { Cleeps, SafeAreaView } from "../components";
import { useStore } from "../context";
import tw from "../twrnc";
import routes from "../navigations/routes";

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { state } = useStore();

  return (
    <>
      {state.hasSession ? <Cleeps /> : <HomeActions navigation={navigation} />}
    </>
  );
};

export default Home;

const HomeActions = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
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
        <Button
          onPress={() =>
            navigation.navigate(routes.MAIN_NAVIGATION.HOME.JOIN_CLEEP)
          }
          contentStyle={tw`py-3`}
          style={tw`w-full my-4`}
          mode="contained"
        >
          Join Cleep
        </Button>
        <Button
          onPress={() =>
            navigation.navigate(routes.MAIN_NAVIGATION.HOME.CREATE_CLEEP)
          }
          contentStyle={tw`py-3`}
          style={tw`w-full my-4`}
          mode="outlined"
        >
          Create Cleep
        </Button>
      </View>
    </SafeAreaView>
  );
};
