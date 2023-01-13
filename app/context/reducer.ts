export enum Actions {
  TOGGLE_THEME = "TOGGLE_THEME",
}

const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case Actions.TOGGLE_THEME:
      return { theme: state.theme === "light" ? "dark" : "light" };

    default:
      return state;
  }
};

export default reducer;
