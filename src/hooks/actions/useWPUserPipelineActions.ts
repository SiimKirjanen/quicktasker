import { updateWPUserPipelinesRequest } from "../../api/api";
import { WPUserPipelinesUpdate } from "../../types/user";

function useWPUserPipelineActions() {
  const updateWPUserPipelines = async (
    userId: string,
    pipelineIds: string[],
    callback?: (update: WPUserPipelinesUpdate) => void,
    onFailureCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await updateWPUserPipelinesRequest(userId, pipelineIds);
      if (callback) callback(response.data);
    } catch (e) {
      if (onFailureCallback) onFailureCallback(e);
    }
  };

  return { updateWPUserPipelines };
}

export { useWPUserPipelineActions };
