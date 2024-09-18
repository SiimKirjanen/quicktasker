import { createContext, useEffect, useReducer } from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import { reducer } from "../reducers/pipelines-reducer";
import { PIPELINES_SET } from "../constants";

const initialState: State = {
  pipelines: [],
};

type State = {
  pipelines: Pipeline[];
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type PipelinesDispatch = {
  state: State;
  pipelinesDispatch: Dispatch;
};

const PipelinesContext = createContext<PipelinesDispatch>({
  state: initialState,
  pipelinesDispatch: () => {},
});

const PipelinesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, pipelinesDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialPipelines = window.wpqt.initialPipelines;

    pipelinesDispatch({ type: PIPELINES_SET, payload: initialPipelines });
  }, []);

  return (
    <PipelinesContext.Provider value={{ state, pipelinesDispatch }}>
      {children}
    </PipelinesContext.Provider>
  );
};

export { PipelinesContextProvider, PipelinesContext, type State, type Action };
