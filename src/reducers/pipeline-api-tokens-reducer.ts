import {
  ADD_PIPELINE_API_TOKEN,
  REMOVE_PIPELINE_API_TOKEN,
  SET_ACTIVE_PIPELINE_ID,
  SET_PIPELINE_API_TOKENS,
  SET_PIPELINE_API_TOKENS_LOADING,
} from "../constants";
import { Action, State } from "../providers/PipelineApiTokensContextProvider";
import { ApiToken } from "../types/api-token";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PIPELINE_API_TOKENS: {
      const apiTokens: ApiToken[] = action.payload.apiTokens;

      return {
        ...state,
        apiTokens,
      };
    }
    case ADD_PIPELINE_API_TOKEN: {
      const apiToken: ApiToken = action.payload.apiToken;

      return {
        ...state,
        apiTokens: state.apiTokens
          ? [...state.apiTokens, apiToken]
          : [apiToken],
      };
    }
    case SET_PIPELINE_API_TOKENS_LOADING: {
      const loading: boolean = action.payload;

      return {
        ...state,
        loading,
      };
    }
    case REMOVE_PIPELINE_API_TOKEN: {
      const tokenIdToRemove: string = action.payload;

      if (!state.apiTokens) {
        return state;
      }

      return {
        ...state,
        apiTokens: state.apiTokens.filter(
          (token) => token.id !== tokenIdToRemove,
        ),
      };
    }
    case SET_ACTIVE_PIPELINE_ID: {
      const activePipelineId: string = action.payload;

      return {
        ...state,
        activePipelineId,
      };
    }
    default:
      return state;
  }
};

export { reducer };
