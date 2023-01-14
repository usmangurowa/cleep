import storage from "../storage";

export enum Actions {
  TOGGLE_THEME = "TOGGLE_THEME",
  INITIALIZE = "INITIALIZE",
}

const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case Actions.TOGGLE_THEME:
      const new_state = {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
      storage.set("initialState", JSON.stringify(new_state));
      return new_state;
    case Actions.INITIALIZE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
