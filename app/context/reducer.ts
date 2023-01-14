import storage from "../storage";

export enum Actions {
  TOGGLE_THEME = "TOGGLE_THEME",
  INITIALIZE = "INITIALIZE",
  HIDE_WELCOME = "HIDE_WELCOME",
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
