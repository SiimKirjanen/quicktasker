import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { createNewStageRequest, editStageRequest } from "../../api/api";
import { SET_PIPELINE_MISSING } from "../../constants";
import { Stage, StageFromServer } from "../../types/stage";
import { useMissingContent } from "../useMissingContent";
import { useMissingResourceDetection } from "../useMissingResourceDetection";

function useStageActions() {
  const { detectMissingResources } = useMissingResourceDetection();
  const { dispatch } = useMissingContent();

  const addStage = async (
    targetPipelineId: string,
    stageName: string,
    stageDescription: string,
    successCallback?: (stage: StageFromServer) => void,
    errorCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await createNewStageRequest(
        targetPipelineId,
        stageName,
        stageDescription,
      );
      toast.success(__("Stage created successfully", "quicktasker"));
      if (successCallback) {
        successCallback(response.data);
      }
    } catch (error) {
      toast.error(__("Failed to create stage", "quicktasker"));

      if (detectMissingResources(error).detected) {
        dispatch({ type: SET_PIPELINE_MISSING, payload: true });
      } else if (errorCallback) {
        errorCallback(error);
      }
    }
  };

  const editStage = async (
    stage: Stage,
    successCallback?: (stage: StageFromServer) => void,
    errorCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await editStageRequest(stage);
      toast.success(__("Stage updated successfully", "quicktasker"));
      if (successCallback) {
        successCallback(response.data);
      }
    } catch (error) {
      toast.error(__("Failed to update stage", "quicktasker"));

      if (detectMissingResources(error).detected) {
        dispatch({ type: SET_PIPELINE_MISSING, payload: true });
      } else if (errorCallback) {
        errorCallback(error);
      }
    }
  };

  return { editStage, addStage };
}

export { useStageActions };
