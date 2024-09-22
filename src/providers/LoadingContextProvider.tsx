import { createContext, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/loading-reducer";

const initialState: State = {
  fullPageLoading: false,
};

type State = {
  fullPageLoading: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserContextType = {
  state: State;
  loadingDispatch: Dispatch;
};

const LoadingContext = createContext<UserContextType>({
  state: initialState,
  loadingDispatch: () => {},
});

const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, loadingDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  return (
    <LoadingContext.Provider value={{ state, loadingDispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContextProvider, LoadingContext, type State, type Action };
