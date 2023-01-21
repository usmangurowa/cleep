import { View } from "react-native";
import React from "react";
import tw from "../twrnc";
import { IconButton, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Header = ({
  title,
  rightIcon,
}: {
  title?: string;
  rightIcon?: React.ReactNode;
}) => {
  const navigation: NavigationProp<any> = useNavigation();
  return (
    <View style={tw`flex flex-row items-center justify-between px-2`}>
      <IconButton
        onPress={navigation.goBack}
        icon={"chevron-left"}
        style={tw`dark:bg-white/10 bg-black/10
        `}
      />
      <Text style={tw`text-2xl font-bold`}>{title}</Text>
      <IconButton
        icon={"chevron-left"}
        style={tw`dark:bg-white/20 bg-black/20 ${rightIcon ? "" : "opacity-0"}
        `}
      />
    </View>
  );
};

export default Header;
