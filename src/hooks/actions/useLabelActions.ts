import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  createPipelineLabelRequest,
  getPipelineLabelsRequest,
} from "../../api/api";
import { Label } from "../../types/label";

function useLabelActions() {
  const getPipelineLabels = async (
    boardId: string,
    callback: (success: boolean, labels?: Label[]) => void,
  ) => {
    try {
      const response = await getPipelineLabelsRequest(boardId);
      if (callback) {
        callback(true, response.data.labels);
      }
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(false);
      }
    }
  };

  const createPipelineLabel = async (
    pipelineId: string,
    name: string,
    color: string,
    callback: (success: boolean, label?: Label) => void,
  ) => {
    try {
      const response = await createPipelineLabelRequest(
        pipelineId,
        name,
        color,
      );
      toast.success(__("Label created successfully", "quicktasker"));
      if (callback) {
        callback(true, response.data.label);
      }
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to create label", "quicktasker"));
      if (callback) {
        callback(false);
      }
    }
  };

  return { getPipelineLabels, createPipelineLabel };
}

export { useLabelActions };
