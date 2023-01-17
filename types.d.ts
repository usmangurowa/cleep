type SnackBarType = {
  open?: boolean;
  message: string;
  duration?: number;
  onClose?(): void;
  type?: "error" | "success" | "primary" | "warning" | "transfer" | undefined;
};

interface InitialStateTypes {
  theme: "light" | "dark";
  showWelcome: boolean;
  hasSession: boolean;
  isConnected: boolean;
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

interface DocumentType {
  id: string;
  content: string;
  type: "text" | "file";
  created_at: string;
  updated_at: string;
}
