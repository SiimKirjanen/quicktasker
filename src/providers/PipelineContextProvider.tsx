import { createContext, useReducer, useEffect } from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import {
  PIPELINE_SET_EXISTING_PIPELINES,
  PIPELINE_SET_LOADING,
  PIPELINE_SET_PIPELINE,
} from "../constants";
import { pipelineReducer } from "../reducers/pipeline-reducer";
import { getPipelineData } from "../api/api";
import { toast } from "react-toastify";

const initialState = {
  loading: true,
  activePipeline: null,
  existingPipelines: [],
};

type State = {
  loading: boolean;
  activePipeline: Pipeline | null;
  existingPipelines: Pipeline[];
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type PipelineContextType = {
  state: State;
  dispatch: Dispatch;
  fetchAndSetPipelineData: (pipelineId: string) => void;
};

const PipelineContext = createContext<PipelineContextType>({
  state: initialState,
  dispatch: () => {},
  fetchAndSetPipelineData: () => {},
});

const PipelineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(pipelineReducer, initialState);

  const fetchAndSetPipelineData = async (pipelineId: string) => {
    try {
      dispatch({ type: PIPELINE_SET_LOADING, payload: true });
      const {
        data: { pipeline, pipelines },
      } = await getPipelineData(pipelineId);

      dispatch({
        type: PIPELINE_SET_EXISTING_PIPELINES,
        payload: pipelines,
      });
      dispatch({ type: PIPELINE_SET_PIPELINE, payload: pipeline });
      dispatch({ type: PIPELINE_SET_LOADING, payload: false });
    } catch (e) {
      dispatch({ type: PIPELINE_SET_LOADING, payload: false });
      console.error(e);
      toast.error("Unable to load the board. Please try again later.");
    }
  };

  useEffect(() => {
    const initialActivePipelineId = window.wpqt.initialActivePipelineId;

    fetchAndSetPipelineData(initialActivePipelineId);
  }, []);

  return (
    <PipelineContext.Provider
      value={{ state, dispatch, fetchAndSetPipelineData }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export { PipelineContextProvider, PipelineContext, type State, type Action };
