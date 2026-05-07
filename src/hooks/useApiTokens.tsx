import { useContext } from "@wordpress/element";
import { PipelineApiTokensContext } from "../providers/PipelineApiTokensContextProvider";

function useApiTokens() {
  const {
    state: { loading, apiTokens, activePipelineId },
    pipelineApiTokensDispatch,
    refetchPipelineApiTokens,
  } = useContext(PipelineApiTokensContext);

  return {
    loading,
    apiTokens,
    activePipelineId,
    pipelineApiTokensDispatch,
    refetchPipelineApiTokens,
  };
}

export { useApiTokens };
