import { createContext, useReducer, useEffect } from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import { PIPELINE_SET_PIPELINE } from "../constants";
import { pipelineReducer } from "../reducers/pipeline-reducer";

const initialState = {
  loading: true,
  pipeline: null,
};

type State = {
  loading: boolean;
  pipeline: Pipeline | null;
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

const PipelineContext = createContext<PipelineContextType>({
  state: initialState,
  dispatch: () => {},
});

const PipelineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(pipelineReducer, initialState);

  useEffect(() => {
    const initialFullPipeline = window.wpqt.initialFullPipeline;

    dispatch({ type: PIPELINE_SET_PIPELINE, payload: initialFullPipeline });
  }, []);

  return (
    <PipelineContext.Provider value={{ state, dispatch }}>
      {children}
    </PipelineContext.Provider>
  );
};

export { PipelineContextProvider, PipelineContext, type State, type Action };
