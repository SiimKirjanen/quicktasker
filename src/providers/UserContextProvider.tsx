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

type UserContextType = {
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

const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => {},
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
