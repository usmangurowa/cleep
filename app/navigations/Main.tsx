import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AddCleepScreen,
  CreateCleepScreen,
  DevicesScreen,
  EditCleepScreen,
  HomeScreen,
  JoinCleepScreen,
  SettingsScreen,
} from "../screens";
import tw from "../twrnc";
import { View } from "react-native";
import { useStore } from "../context";

import { Octicons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "./routes";
import { withTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <View style={tw`flex-1 dark:bg-black rounded-t-10 overflow-hidden`}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: tw.style("bg-transparent ", {
            elevation: 0,
            borderTopWidth: 0,
          }),
          tabBarLabel: () => null,
          tabBarActiveTintColor: tw.color("primary"),
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" size={size} color={color} />
            ),
          }}
          name={routes.MAIN_NAVIGATION.HOME.INDEX}
          component={HomeScreenNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="devices"
                size={size}
                color={color}
              />
            ),
          }}
          name={routes.MAIN_NAVIGATION.DEVICES}
          component={DevicesScreen}
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

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={routes.MAIN_NAVIGATION.HOME.CLEEP_LIST}
        component={HomeScreen}
      />
      <Stack.Screen
        name={routes.MAIN_NAVIGATION.HOME.CREATE_CLEEP}
        component={CreateCleepScreen}
      />
      <Stack.Screen
        name={routes.MAIN_NAVIGATION.HOME.JOIN_CLEEP}
        component={JoinCleepScreen}
      />
      <Stack.Screen
        name={routes.MAIN_NAVIGATION.HOME.ADD_CLEEP}
        component={AddCleepScreen}
      />
      <Stack.Screen
        name={routes.MAIN_NAVIGATION.HOME.EDIT_CLEEP}
        component={EditCleepScreen}
      />
    </Stack.Navigator>
  );
};
