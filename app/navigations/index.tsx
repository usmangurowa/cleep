import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import storage from "../storage";
import { WelcomeScreen } from "../screens";
import routes from "./routes";
import Main from "./Main";
import { useStore } from "../context";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const { state, dispatch } = useStore();
  // const state: InitialStateTypes = JSON.parse(
  //   storage.getString("initialState") ||
  //     JSON.stringify({ theme: "light", showWelcome: true })
  // );
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {state.showWelcome ? (
          <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
        ) : (
          <Stack.Screen name={routes.MAIN_NAVIGATION.INDEX} component={Main} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
