import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SettingsScreen } from "../screens";
import tw from "../twrnc";
import { View } from "react-native";
import { useStore } from "../context";
const Tab = createBottomTabNavigator();

import { Octicons, Ionicons } from "@expo/vector-icons";
import routes from "./routes";
import { withTheme } from "react-native-paper";

const Main = () => {
  return (
    <View style={tw`flex-1 dark:bg-black`}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: tw.style("bg-transparent", {
            elevation: 0,
            borderTopWidth: 0,
          }),
          tabBarLabel: () => null,
          tabBarActiveTintColor: tw.color("primary"),
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" size={size} color={color} />
            ),
          }}
          name={routes.MAIN_NAVIGATION.HOME}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-settings-outline" size={size} color={color} />
            ),
          }}
          name={routes.MAIN_NAVIGATION.SETTINGS}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default withTheme(Main);
