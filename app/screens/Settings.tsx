import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "../components";
import { Button, Text } from "react-native-paper";
import tw from "../twrnc";
import { useStore } from "../context";
import { Actions } from "../context/reducer";
import storage from "../storage";

const Settings = () => {
  const { dispatch, state } = useStore();

  const handleChangeTheme = () => {
    dispatch({ type: Actions.TOGGLE_THEME });
  };

  const handleClearSession = () => {
    dispatch({ type: Actions.REMOVE_SESSION });
  };

  const handleReset = () => {
    dispatch({ type: Actions.RESET_SETTINGS });
  };
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-start container`}>
      <Text>Settings</Text>

      <Button
        onPress={handleClearSession}
        contentStyle={tw`py-3`}
        style={tw`w-full my-3`}
        mode="contained"
      >
        Clear Session
      </Button>
      <Button
        onPress={handleChangeTheme}
        contentStyle={tw`py-3`}
        style={tw`w-full my-3`}
        mode="contained"
      >
        {state.theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
      <Button
        onPress={handleReset}
        contentStyle={tw`py-3`}
        style={tw`w-full my-3`}
        mode="contained"
      >
        Reset Settings
      </Button>
    </SafeAreaView>
  );
};

export default Settings;
