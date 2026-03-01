import { createContext, useEffect, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getPipelineApiTokensRequest } from "../api/api";
import {
  ADD_PIPELINE_API_TOKEN,
  REMOVE_PIPELINE_API_TOKEN,
  SET_ACTIVE_PIPELINE_ID,
  SET_PIPELINE_API_TOKENS,
  SET_PIPELINE_API_TOKENS_LOADING,
} from "../constants";
import { reducer } from "../reducers/pipeline-api-tokens-reducer";
import { ApiToken } from "../types/api-token";
import { convertApiTokensFromServer } from "../utils/api-token";

type State = {
  apiTokens: ApiToken[] | null;
  loading: boolean;
  activePipelineId: string | null;
};

const initialState: State = {
  apiTokens: null,
  loading: true,
  activePipelineId: null,
};

type Action =
  | {
      type: typeof SET_PIPELINE_API_TOKENS;
      payload: {
        apiTokens: ApiToken[];
      };
    }
  | {
      type: typeof ADD_PIPELINE_API_TOKEN;
      payload: {
        apiToken: ApiToken;
      };
    }
  | {
      type: typeof SET_PIPELINE_API_TOKENS_LOADING;
      payload: boolean;
    }
  | {
      type: typeof REMOVE_PIPELINE_API_TOKEN;
      payload: string;
    }
  | {
      type: typeof SET_ACTIVE_PIPELINE_ID;
      payload: string;
    };

type Dispatch = (action: Action) => void;

type PipelineApiTokensContextType = {
  state: State;
  pipelineApiTokensDispatch: Dispatch;
};

const PipelineApiTokensContext = createContext<PipelineApiTokensContextType>({
  state: initialState,
  pipelineApiTokensDispatch: () => {},
});

const PipelineApiTokensContextProvider = ({
  children,
  pipelineId,
}: {
  children: React.ReactNode;
  pipelineId: string;
}) => {
  const [state, pipelineApiTokensDispatch] = useReducer(reducer, initialState);

  async function fetchPipelineApiTokens() {
    pipelineApiTokensDispatch({
      type: SET_PIPELINE_API_TOKENS_LOADING,
      payload: true,
    });

    try {
      const response = await getPipelineApiTokensRequest(pipelineId);
      pipelineApiTokensDispatch({
        type: SET_PIPELINE_API_TOKENS,
        payload: { apiTokens: convertApiTokensFromServer(response.data) },
      });
    } catch (error) {
      toast.error(__("Failed to fetch board API tokens.", "quicktasker"));
    } finally {
      pipelineApiTokensDispatch({
        type: SET_PIPELINE_API_TOKENS_LOADING,
        payload: false,
      });
    }
  }

  useEffect(() => {
    pipelineApiTokensDispatch({
      type: SET_ACTIVE_PIPELINE_ID,
      payload: pipelineId,
    });
    fetchPipelineApiTokens();
  }, [pipelineId]);

  return (
    <PipelineApiTokensContext.Provider
      value={{ state, pipelineApiTokensDispatch }}
    >
      {children}
    </PipelineApiTokensContext.Provider>
  );
};

export {
  PipelineApiTokensContext,
  PipelineApiTokensContextProvider,
  type Action,
  type State,
};
