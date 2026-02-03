import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  assignLabelToTaskRequest,
  createPipelineLabelRequest,
  deleteLabelRequest,
  getPipelineLabelsRequest,
  unassignLabelFromTaskRequest,
  updateLabelRequest,
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

  const editLabel = async (
    pipelineId: string,
    label: Label,
    callback?: (success: boolean, label?: Label) => void,
  ) => {
    try {
      const response = await updateLabelRequest(pipelineId, label);
      toast.success(__("Label updated successfully", "quicktasker"));
      if (callback) {
        callback(true, response.data.label);
      }
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to update label", "quicktasker"));
      if (callback) {
        callback(false);
      }
    }
  };

  const assignLabelToTask = async (
    pipelineId: string,
    taskId: string,
    labelId: string,
  ): Promise<{ success: boolean; label?: Label }> => {
    try {
      const response = await assignLabelToTaskRequest(
        pipelineId,
        taskId,
        labelId,
      );

      toast.success(__("Label added to task", "quicktasker"));

      return {
        success: true,
        label: response.data.label,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to add label to task", "quicktasker"));

      return {
        success: false,
      };
    }
  };

  const usassignLabelFromTask = async (
    pipelineId: string,
    taskId: string,
    labelId: string,
  ): Promise<{ success: boolean }> => {
    try {
      await unassignLabelFromTaskRequest(pipelineId, taskId, labelId);
      toast.success(__("Label removed from task", "quicktasker"));

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to remove label from task", "quicktasker"));

      return {
        success: false,
      };
    }
  };

  const deleteLabel = async (
    pipelineId: string,
    labelId: string,
    callback?: (success: boolean, label?: Label) => void,
  ) => {
    try {
      const result = await deleteLabelRequest(pipelineId, labelId);
      toast.success(__("Label deleted from the board", "quicktasker"));
      if (callback) {
        callback(true, result.data.deletedLabel);
      }
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to delete label", "quicktasker"));
      if (callback) {
        callback(false);
      }
    }
  };

  return {
    deleteLabel,
    getPipelineLabels,
    createPipelineLabel,
    editLabel,
    assignLabelToTask,
    usassignLabelFromTask,
  };
}

export { useLabelActions };
