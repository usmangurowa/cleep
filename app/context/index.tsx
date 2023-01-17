import React from "react";
import { useAppColorScheme, useDeviceContext } from "twrnc";
import storage from "../storage";
import tw from "../twrnc";
import reducer, { Actions } from "./reducer";

const initialState: InitialStateTypes = {
  theme: "light",
  showWelcome: true,
  hasSession: false,
  isConnected: false,
};

const storeContext = React.createContext<{
  state: InitialStateTypes;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(
    tw,
    state.theme
  );

  React.useEffect(() => {
    setColorScheme(state.theme);
  }, [state.theme]);

  React.useEffect(() => {
    const data = storage.getString("initialState");
    const session = storage.getString("session");
    if (data) {
      dispatch({ type: Actions.INITIALIZE, payload: JSON.parse(data) });
    }
    if (session) {
      dispatch({ type: Actions.CREATE_SESSION, payload: JSON.parse(session) });
    }
  }, []);

  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => React.useContext(storeContext); // This is the hook that we will use in our components
