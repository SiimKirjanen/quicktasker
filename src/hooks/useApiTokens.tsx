import { useContext } from "@wordpress/element";
import { PipelineApiTokensContext } from "../providers/PipelineApiTokensContextProvider";

function useApiTokens() {
  const {
    state: { loading, apiTokens, activePipelineId },
    pipelineApiTokensDispatch,
  } = useContext(PipelineApiTokensContext);

  return {
    loading,
    apiTokens,
    activePipelineId,
    pipelineApiTokensDispatch,
  };
}

export { useApiTokens };
