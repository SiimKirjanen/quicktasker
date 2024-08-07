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

type PipelineContextType = {
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

const PipelineContext = createContext<PipelineContextType>({
  state: initialState,
  dispatch: () => {},
});

const PipelineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PipelineContext.Provider value={{ state, dispatch }}>
      {children}
    </PipelineContext.Provider>
  );
};

export { PipelineContextProvider, PipelineContext };
