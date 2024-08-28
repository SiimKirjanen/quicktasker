import { createContext, useReducer, useEffect } from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import { PIPELINE_SET_LOADING, PIPELINE_SET_PIPELINE } from "../constants";
import { pipelineReducer } from "../reducers/pipeline-reducer";
import { getPipelineData } from "../api/api";
import { toast } from "react-toastify";

const initialState = {
  loading: true,
  activePipeline: null,
};

type State = {
  loading: boolean;
  activePipeline: Pipeline | null;
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

const ActivePipelineContext = createContext<PipelineContextType>({
  state: initialState,
  dispatch: () => {},
  fetchAndSetPipelineData: () => {},
});

const ActivePipelineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(pipelineReducer, initialState);

  useEffect(() => {
    const initialActivePipelineId = window.wpqt.initialActivePipelineId;

    fetchAndSetPipelineData(initialActivePipelineId);
  }, []);

  const fetchAndSetPipelineData = async (pipelineId: string) => {
    try {
      dispatch({ type: PIPELINE_SET_LOADING, payload: true });
      const {
        data: { pipeline },
      } = await getPipelineData(pipelineId);

      dispatch({ type: PIPELINE_SET_PIPELINE, payload: pipeline });
      dispatch({ type: PIPELINE_SET_LOADING, payload: false });
    } catch (e) {
      dispatch({ type: PIPELINE_SET_LOADING, payload: false });
      console.error(e);
      toast.error("Unable to load the board. Please try again later.");
    }
  };

  return (
    <ActivePipelineContext.Provider
      value={{ state, dispatch, fetchAndSetPipelineData }}
    >
      {children}
    </ActivePipelineContext.Provider>
  );
};

export {
  ActivePipelineContextProvider,
  ActivePipelineContext,
  type State,
  type Action,
};
