import { setApiHeader } from "../api";
import storage from "../storage";

export enum Actions {
  TOGGLE_THEME = "TOGGLE_THEME",
  INITIALIZE = "INITIALIZE",
  HIDE_WELCOME = "HIDE_WELCOME",
  CREATE_SESSION = "CREATE_SESSION",
  REMOVE_SESSION = "REMOVE_SESSION",
  RESET_SETTINGS = "RESET_SETTINGS",
  ON_CONNECT = "ON_CONNECT",
  ON_DISCONNECT = "ON_DISCONNECT",
}

const reducer: ReducerType = (state, action) => {
  const data = storage.getString("initialState");
  let new_state = data ? JSON.parse(data) : state;
  switch (action.type) {
    case Actions.TOGGLE_THEME:
      new_state = {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
      break;
    case Actions.HIDE_WELCOME:
      new_state = {
        ...state,
        showWelcome: false,
      };
      break;
    case Actions.CREATE_SESSION:
      setApiHeader({
        SESSION_ID: action.payload.sessionId,
        SIGNING_KEY: action.payload.signInKey,
      });
      storage.set(
        "session",
        JSON.stringify({
          sessionId: action.payload.sessionId,
          signInKey: action.payload.signInKey,
          createdAt: new Date().getTime(),
        })
      );
      new_state = {
        ...state,
        hasSession: true,
      };
      break;
    case Actions.REMOVE_SESSION:
      storage.delete("session");
      new_state = {
        ...state,
        hasSession: false,
      };
      break;
    case Actions.ON_CONNECT:
      new_state = {
        ...state,
        isConnected: true,
      };
      break;
    case Actions.ON_DISCONNECT:
      new_state = {
        ...state,
        isConnected: false,
      };
      break;
    case Actions.RESET_SETTINGS:
      storage.clearAll();
      new_state = {
        theme: "light",
        showWelcome: true,
        hasSession: false,
        isConnected: false,
      };
      break;
    case Actions.INITIALIZE:
      new_state = { ...state, ...action.payload };
      break;
    default:
      new_state = state;
      break;
  }
  storage.set("initialState", JSON.stringify(new_state));
  return new_state;
};

export default reducer;
