import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StoreProvider, useStore } from "./app/context";
import { Button, Provider as PaperProvider, Text } from "react-native-paper";
import theme from "./app/theme";
import tw from "./app/twrnc";
import { Actions } from "./app/context/reducer";
import { HomeScreen } from "./app/screens";

const AppEntry = () => {
  const { state, dispatch } = useStore();

  return (
    <PaperProvider theme={theme(state.theme)}>
      <StatusBar style={state.theme} />
      <HomeScreen />
    </PaperProvider>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider>
        <AppEntry />
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
