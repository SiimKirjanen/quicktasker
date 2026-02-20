import { createContext, useEffect, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getPipelineWebhookssRequest } from "../api/api";
import {
  ADD_PIPELINE_WEBHOOK,
  EDIT_PIPELINE_WEBHOOK,
  REMOVE_PIPELINE_WEBHOOK,
  SET_PIPELINE_WEBHOOKS,
  SET_PIPELINE_WEBHOOKS_LOADING,
} from "../constants";
import { reducer } from "../reducers/pipeline-webhooks-recuder";
import { Webhook } from "../types/webhook";
import { convertWebhooksFromServer } from "../utils/webhooks";

type State = {
  webhooks: Webhook[];
  loading: boolean;
};

const initialState: State = {
  webhooks: [],
  loading: true,
};

type Action =
  | {
      type: typeof SET_PIPELINE_WEBHOOKS;
      payload: {
        webhooks: Webhook[];
      };
    }
  | {
      type: typeof SET_PIPELINE_WEBHOOKS_LOADING;
      payload: boolean;
    }
  | {
      type: typeof ADD_PIPELINE_WEBHOOK;
      payload: {
        webhook: Webhook;
      };
    }
  | {
      type: typeof EDIT_PIPELINE_WEBHOOK;
      payload: {
        webhookId: string;
        webhookData: Partial<Webhook>;
      };
    }
  | {
      type: typeof REMOVE_PIPELINE_WEBHOOK;
      payload: {
        webhookId: string;
      };
    };

type Dispatch = (action: Action) => void;

type PipelineWebhooksContextType = {
  state: State;
  pipelineWebhooksDispatch: Dispatch;
};

const PipelineWebhooksContext = createContext<PipelineWebhooksContextType>({
  state: initialState,
  pipelineWebhooksDispatch: () => {},
});

const PipelineWebhooksContextProvider = ({
  children,
  pipelineId,
}: {
  children: React.ReactNode;
  pipelineId: string;
}) => {
  const [state, pipelineWebhooksDispatch] = useReducer(reducer, initialState);

  const loadWebhooks = async () => {
    try {
      pipelineWebhooksDispatch({
        type: SET_PIPELINE_WEBHOOKS_LOADING,
        payload: true,
      });
      const response = await getPipelineWebhookssRequest(pipelineId);

      pipelineWebhooksDispatch({
        type: SET_PIPELINE_WEBHOOKS,
        payload: {
          webhooks: convertWebhooksFromServer(response.data.webhooks),
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load board webhooks", "quicktasker"));
    } finally {
      pipelineWebhooksDispatch({
        type: SET_PIPELINE_WEBHOOKS_LOADING,
        payload: false,
      });
    }
  };

  useEffect(() => {
    loadWebhooks();
  }, [pipelineId]);

  return (
    <PipelineWebhooksContext.Provider
      value={{ state, pipelineWebhooksDispatch }}
    >
      {children}
    </PipelineWebhooksContext.Provider>
  );
};

export {
  PipelineWebhooksContext,
  PipelineWebhooksContextProvider,
  type Action,
  type State,
};
