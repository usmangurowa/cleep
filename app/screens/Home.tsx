import { FlatList, View } from "react-native";
import React from "react";
import tw from "../twrnc";
import { Button, Headline, Text, withTheme } from "react-native-paper";
import { SafeAreaView } from "../components";
import { FAB, Badge } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import constants from "../constants";

const Home = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const data = Array.from({ length: 50 }, (_, i) => i);
  return (
    <SafeAreaView style={tw`flex-1 justify-between`}>
      <View style={tw`p-2 flex flex-row items-center justify-between`}>
        <Headline style={tw`font-bold`}>Cleep</Headline>
        <View
          style={tw`p-2 rounded-lg dark:bg-white dark:bg-opacity-20 bg-black/20`}
        >
          <Badge style={tw`bg-success`} size={20} />
        </View>
      </View>
      <FlatList
        // horizontal
        numColumns={2}
        contentContainerStyle={tw`w-full`}
        renderItem={({ item }) => (
          <View style={tw`p-2 w-1/2`}>
            <View
              style={tw`bg-[${constants.colors[item]}]/50 w-full p-2 rounded-xl`}
            >
              <Text numberOfLines={10}>
                {item} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Architecto assumenda quod repellendus deserunt! Unde saepe cum
                in! Unde debitis, laborum enim qui quia sequi dicta. Culpa dicta
                laudantium repellat aliquid.
              </Text>
            </View>
          </View>
        )}
        // estimatedItemSize={100}
        data={data}
        showsVerticalScrollIndicator={false}
      />

      <FAB.Group
        style={tw``}
        fabStyle={tw`rounded-full`}
        // backdropColor="transparent"
        open={open}
        visible
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Text Document",
            onPress: () => console.log("Pressed star"),
            style: tw`rounded-full`,
          },
          {
            icon: "login-variant",
            label: "New Session",
            onPress: () => console.log("Pressed email"),
            style: tw`rounded-full`,
          },
          {
            icon: "devices",
            label: "Add Devices",
            onPress: () => console.log("Pressed notifications"),
            style: tw`rounded-full`,
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </SafeAreaView>
  );
};

export default withTheme(Home);
