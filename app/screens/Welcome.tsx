import { Image, View } from "react-native";
import React from "react";
import tw from "../twrnc";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "../components";
import { useStore } from "../context";
import { Actions } from "../context/reducer";
import { NavigationProp } from "@react-navigation/native";
const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { state, dispatch } = useStore();

  const handleGetStarted = () => {
    dispatch({ type: Actions.HIDE_WELCOME });
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-between container`}>
      <View style={tw`flex items-center my-10`}>
        <Image
          source={require("../assets/icon.png")}
          style={tw`w-40 h-40 rounded-xl my-5`}
        />
        <Text style={tw`text-center`} variant="displayMedium">
          Your real-time online clipboard
        </Text>
      </View>
      <View style={tw`my-10 w-full`}>
        <Button
          onPress={handleGetStarted}
          contentStyle={tw`py-3`}
          style={tw`w-full`}
          mode="contained"
        >
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
