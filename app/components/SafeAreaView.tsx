import { SafeAreaView as SafeArea, ViewStyle } from "react-native";
import React from "react";
import tw from "../twrnc";
import constants from "expo-constants";

const SafeAreaView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <SafeArea style={[tw`pt-${constants.statusBarHeight}px flex-1`, style]}>
      {children}
    </SafeArea>
  );
};

export default SafeAreaView;
