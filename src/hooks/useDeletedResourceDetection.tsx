import { WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND } from "../constants";

function useDeletedResourceDetection() {
  function detectDeletedPipelineResponse(e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "messages" in e &&
      Array.isArray(e.messages) &&
      e.messages.includes(WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND)
    ) {
      return true;
    }
    return false;
  }

  return {
    detectDeletedPipelineResponse,
  };
}

export { useDeletedResourceDetection };
