import {
  WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND,
} from "../constants";

function useMissingResourceDetection() {
  function hasExceptionCode(e: unknown, exceptionCode: string): boolean {
    return (
      typeof e === "object" &&
      e !== null &&
      "messages" in e &&
      Array.isArray(e.messages) &&
      e.messages.includes(exceptionCode)
    );
  }

  function detectMissingPipelineResponse(e: unknown): boolean {
    return hasExceptionCode(e, WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND);
  }

  function detectMissingStageResponse(e: unknown): boolean {
    return hasExceptionCode(e, WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND);
  }

  function detectMissingResources(e: unknown): { detected: boolean } {
    return {
      detected:
        detectMissingPipelineResponse(e) || detectMissingStageResponse(e),
    };
  }

  return {
    detectMissingPipelineResponse,
    detectMissingStageResponse,
    detectMissingResources,
  };
}

export { useMissingResourceDetection };
