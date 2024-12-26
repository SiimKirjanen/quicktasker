import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  createPipelineRequest,
  deletePipelineRequest,
  editPipelineRequest,
} from "../../api/api";
import { Pipeline, PipelineFromServer } from "../../types/pipeline";

function usePipelineActions() {
  const addPipeline = async (
    pipelineName: string,
    pipelineDescription: string,
    successCallback?: (pipeline: PipelineFromServer) => void,
    errorCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await createPipelineRequest(
        pipelineName,
        pipelineDescription,
      );
      toast.success(__("Board created successfully", "quicktasker"));
      if (successCallback) {
        successCallback(response.data);
      }
    } catch (error) {
      toast.error(__("Failed to create a board", "quicktasker"));
      if (errorCallback) {
        errorCallback(error);
      }
    }
  };

  const editPipeline = async (
    pipeline: Pipeline,
    successCallback?: (pipeline: PipelineFromServer) => void,
    errorCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await editPipelineRequest(pipeline);
      toast.success(__("Board updated successfully", "quicktasker"));
      if (successCallback) {
        successCallback(response.data);
      }
    } catch (error) {
      toast.error(__("Failed to update board", "quicktasker"));
      if (errorCallback) {
        errorCallback(error);
      }
    }
  };

  const deletePipeline = async (
    pipelineId: string,
    callback?: (pipelineId: string, pipelineIdToLoad: string | null) => void,
  ) => {
    try {
      const response = await deletePipelineRequest(pipelineId);
      if (callback)
        callback(
          response.data.deletedPipelineId,
          response.data.pipelineIdToLoad,
        );
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to delete board", "quicktasker"));
    }
  };
  return {
    deletePipeline,
    addPipeline,
    editPipeline,
  };
}

export { usePipelineActions };
