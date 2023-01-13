type SnackBarType = {
  open?: boolean;
  message: string;
  duration?: number;
  onClose?(): void;
  type?: "error" | "success" | "primary" | "warning" | "transfer" | undefined;
};

interface InitialStateTypes {
  theme: "light" | "dark";
}

interface Action {
  type: ActionTypes;
  payload?: any;
}

type ReducerType = (state: InitialStateTypes, action: Action) => State;

type ContextHook = () => {
  state: InitialStateTypes;
  dispatch: (action: Action) => void;
};
