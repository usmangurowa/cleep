import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "../components";
import { Button, Text } from "react-native-paper";
import tw from "../twrnc";
import { useStore } from "../context";
import { Actions } from "../context/reducer";

const Settings = () => {
  const { dispatch } = useStore();

  const handleChangeTheme = () => {
    dispatch({ type: Actions.TOGGLE_THEME });
  };
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-between container`}>
      <Text>Settings</Text>

      <Button
        onPress={handleChangeTheme}
        contentStyle={tw`py-3`}
        style={tw`w-full`}
        mode="contained"
      >
        Create
      </Button>
    </SafeAreaView>
  );
};

export default Settings;
