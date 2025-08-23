import { useContext } from "@wordpress/element";
import { PipelineWebhooksContext } from "../providers/PipelineWebhooksContextProvider";

function useWebhooks() {
  const {
    state: { webhooks, loading },
    pipelineWebhooksDispatch,
  } = useContext(PipelineWebhooksContext);

  return {
    webhooks,
    loading,
    pipelineWebhooksDispatch,
  };
}

export { useWebhooks };
