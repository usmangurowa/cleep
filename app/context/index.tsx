import React from "react";
import { useAppColorScheme, useDeviceContext } from "twrnc";
import tw from "../twrnc";
import reducer from "./reducer";

const initialState: InitialStateTypes = {
  theme: "light",
};

const storeContext = React.createContext<{
  state: InitialStateTypes;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  React.useEffect(() => {
    setColorScheme(state.theme);
  }, [state.theme]);

  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => React.useContext(storeContext); // This is the hook that we will use in our components
