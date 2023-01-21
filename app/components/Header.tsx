import { View, ViewStyle } from "react-native";
import React from "react";
import tw from "../twrnc";
import { IconButton, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type HeaderIconProps = {
  icon: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
};
interface HeaderProps {
  title?: string;
  right?: HeaderIconProps | null;
  left?: HeaderIconProps | null;
  showBackButton?: boolean;
}

const Header = ({
  title,
  right = null,
  left = null,
  showBackButton = true,
}: HeaderProps) => {
  const navigation: NavigationProp<any> = useNavigation();
  return (
    <View style={tw`flex flex-row items-center justify-between px-2`}>
      <View style={tw`${showBackButton ? "" : "px-6.5"}`}>
        {left ? (
          <IconButton
            onPress={left.onPress}
            icon={left.icon}
            style={tw`dark:bg-white/10 bg-black/10
        `}
          />
        ) : (
          <>
            {showBackButton ? (
              <IconButton
                onPress={navigation.goBack}
                icon={"chevron-left"}
                style={tw`dark:bg-white/10 bg-black/10
        `}
              />
            ) : null}
          </>
        )}
      </View>
      <Text style={tw`text-2xl font-bold flex-grow text-center`}>{title}</Text>
      <View style={tw`${right ? "" : "px-6.5"}`}>
        {right && (
          <IconButton
            icon={right.icon}
            onPress={right.onPress}
            style={[tw`dark:bg-white/20 bg-black/20`, right.style]}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
