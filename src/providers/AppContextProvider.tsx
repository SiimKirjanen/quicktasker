import { createContext, useReducer } from "@wordpress/element";

const initialState = {
  loading: true,
};

type State = {
  loading: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type AppContextType = {
  state: State;
  dispatch: Dispatch;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    // Add your different action types and corresponding logic here
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
