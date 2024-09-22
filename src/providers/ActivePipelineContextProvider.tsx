import {
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import {
  PIPELINE_SET_LOADING,
  PIPELINE_SET_PIPELINE,
  SET_FULL_PAGE_LOADING,
} from "../constants";
import { activePipelineReducer } from "../reducers/active-pipeline-reducer";
import { getPipelineData } from "../api/api";
import { toast } from "react-toastify";
import { LoadingContext } from "./LoadingContextProvider";

const initialState = {
  loading: false,
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
  const [state, dispatch] = useReducer(activePipelineReducer, initialState);
  const { loadingDispatch } = useContext(LoadingContext);

  useEffect(() => {
    const initialActivePipelineId = window.wpqt.initialActivePipelineId;

    fetchAndSetPipelineData(initialActivePipelineId, true);
  }, []);

  const setLoadingState = (isLoading: boolean, fullPageLoading: boolean) => {
    if (fullPageLoading) {
      loadingDispatch({
        type: SET_FULL_PAGE_LOADING,
        payload: isLoading,
      });
    } else {
      dispatch({ type: PIPELINE_SET_LOADING, payload: isLoading });
    }
  };

  const fetchAndSetPipelineData = async (
    pipelineId: string,
    fullPageLoading = false,
  ) => {
    try {
      setLoadingState(true, fullPageLoading);

      const {
        data: { pipeline },
      } = await getPipelineData(pipelineId);

      dispatch({ type: PIPELINE_SET_PIPELINE, payload: pipeline });
    } catch (e) {
      console.error(e);
      toast.error("Unable to load the board. Please try again later.");
    } finally {
      setLoadingState(false, fullPageLoading);
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
