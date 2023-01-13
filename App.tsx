import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StoreProvider, useStore } from "./app/context";
import { Button, Provider as PaperProvider, Text } from "react-native-paper";
import theme from "./app/theme";
import tw from "./app/twrnc";
import { Actions } from "./app/context/reducer";

const AppEntry = () => {
  const { state, dispatch } = useStore();

  const toggleTheme = () => {
    dispatch({ type: Actions.TOGGLE_THEME });
  };

  return (
    <PaperProvider theme={theme(state.theme)}>
      <View style={tw`dark:bg-black flex-1 items-center justify-center`}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style={state.theme} />
        <Button onPress={toggleTheme} mode="contained">
          Hello
        </Button>
      </View>
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
