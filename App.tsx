import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StoreProvider, useStore } from "./app/context";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./app/theme";
import Navigation from "./app/navigations";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const AppEntry = () => {
  const { state, dispatch } = useStore();

  return (
    <PaperProvider theme={theme(state.theme)}>
      <BottomSheetModalProvider>
        <StatusBar style={state.theme} />
        <Navigation />
      </BottomSheetModalProvider>
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
