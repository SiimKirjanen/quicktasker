import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { createNewStageRequest, editStageRequest } from "../../api/api";
import { Stage, StageFromServer } from "../../types/stage";
import { useMissingResourceDetection } from "../useMissingResourceDetection";

function useStageActions() {
  const { detectMissingResources } = useMissingResourceDetection();

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

      detectMissingResources(error);

      if (errorCallback) {
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
      console.error(error);
      toast.error(__("Failed to update stage", "quicktasker"));

      detectMissingResources(error);

      if (errorCallback) {
        errorCallback(error);
      }
    }
  };

  return { editStage, addStage };
}

export { useStageActions };
