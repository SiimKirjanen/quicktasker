import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  SET_PIPELINE_MISSING,
  SET_STAGE_MISSING,
  SET_TASK_MISSING,
  WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_TASK_NOT_FOUND,
} from "../constants";
import { useMissingContent } from "./useMissingContent";

function useMissingResourceDetection() {
  const { dispatch } = useMissingContent();

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

  function detectMissingTaskResponse(e: unknown): boolean {
    return hasExceptionCode(e, WP_QUICKTASKER_EXCEPTION_TASK_NOT_FOUND);
  }

  function detectMissingResources(e: unknown): {
    detected: boolean;
    pipelineMissing: boolean;
    stageMissing: boolean;
    taskMissing: boolean;
  } {
    const pipelineMissing = detectMissingPipelineResponse(e);
    const stageMissing = detectMissingStageResponse(e);
    const taskMissing = detectMissingTaskResponse(e);

    if (pipelineMissing) {
      dispatch({ type: SET_PIPELINE_MISSING, payload: true });
    }

    if (stageMissing) {
      dispatch({ type: SET_STAGE_MISSING, payload: true });
      toast.info(
        __(
          "It seems the stage has been removed. Please refresh the board.",
          "quicktasker",
        ),
        {
          autoClose: false,
        },
      );
    }
    if (taskMissing) {
      dispatch({ type: SET_TASK_MISSING, payload: true });
      toast.info(
        __(
          "It seems the task has been removed or archived. Please refresh the board.",
          "quicktasker",
        ),
        {
          autoClose: false,
        },
      );
    }

    return {
      detected: pipelineMissing || stageMissing || taskMissing,
      pipelineMissing,
      stageMissing,
      taskMissing,
    };
  }

  return {
    detectMissingPipelineResponse,
    detectMissingStageResponse,
    detectMissingResources,
  };
}

export { useMissingResourceDetection };
