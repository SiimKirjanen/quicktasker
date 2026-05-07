import { useContext } from "@wordpress/element";
import { PipelineWebhooksContext } from "../providers/PipelineWebhooksContextProvider";

function useWebhooks() {
  const {
    state: { webhooks, loading },
    pipelineWebhooksDispatch,
    refetchPipelineWebhooks,
  } = useContext(PipelineWebhooksContext);

  return {
    webhooks,
    loading,
    pipelineWebhooksDispatch,
    refetchPipelineWebhooks,
  };
}

export { useWebhooks };
