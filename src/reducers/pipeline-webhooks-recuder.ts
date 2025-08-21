import {
  ADD_PIPELINE_WEBHOOK,
  REMOVE_PIPELINE_WEBHOOK,
  SET_PIPELINE_WEBHOOKS,
  SET_PIPELINE_WEBHOOKS_LOADING,
} from "../constants";
import { Action, State } from "../providers/PipelineWebhooksContextProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PIPELINE_WEBHOOKS: {
      return {
        ...state,
        webhooks: action.payload.webhooks,
      };
    }
    case SET_PIPELINE_WEBHOOKS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case ADD_PIPELINE_WEBHOOK: {
      return {
        ...state,
        webhooks: [...state.webhooks, action.payload.webhook],
      };
    }
    case REMOVE_PIPELINE_WEBHOOK: {
      return {
        ...state,
        webhooks: state.webhooks.filter(
          (webhook) => webhook.id !== action.payload.webhookId,
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
