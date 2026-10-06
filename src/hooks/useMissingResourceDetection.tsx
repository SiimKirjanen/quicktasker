import { useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  SET_PIPELINE_MISSING,
  SET_PIPELINE_NO_ACCESS,
  SET_STAGE_MISSING,
  SET_TASK_MISSING,
  WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_TASK_NOT_FOUND,
} from "../constants";
import { useMissingContent } from "./useMissingContent";
import { usePipelines } from "./usePipelines";

function useMissingResourceDetection() {
  const { dispatch } = useMissingContent();
  const { pipelines, refreshPipelines } = usePipelines();
  // Requests start before the boards are loaded into state, so the check reads
  // the boards when the request fails, not when it started.
  const pipelinesRef = useRef(pipelines);
  pipelinesRef.current = pipelines;

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

  // A refused request can also mean a missing capability, so it only counts as
  // missing board access when the board is not among the user's boards. A board
  // that is still listed may have been taken away since the page loaded, so the
  // boards are then reloaded to check.
  async function detectPipelineNoAccess(
    e: unknown,
    pipelineId: string,
  ): Promise<boolean> {
    const refused =
      typeof e === "object" &&
      e !== null &&
      "data" in e &&
      typeof e.data === "object" &&
      e.data !== null &&
      "status" in e.data &&
      e.data.status === 403;

    if (!refused) {
      return false;
    }

    if (pipelinesRef.current.some((pipeline) => pipeline.id === pipelineId)) {
      const pipelineIds = await refreshPipelines();

      if (pipelineIds === null || pipelineIds.includes(pipelineId)) {
        return false;
      }
    }

    dispatch({ type: SET_PIPELINE_NO_ACCESS, payload: true });

    return true;
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
    detectPipelineNoAccess,
  };
}

export { useMissingResourceDetection };
