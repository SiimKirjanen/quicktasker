import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  assignLabelToTaskRequest,
  createPipelineLabelRequest,
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
    callback?: (success: boolean, label?: Label) => void,
  ) => {
    try {
      const response = await assignLabelToTaskRequest(
        pipelineId,
        taskId,
        labelId,
      );

      toast.success(__("Label assigned to task", "quicktasker"));
      if (callback) {
        callback(true, response.data.label);
      }
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to assign label to task", "quicktasker"));
      if (callback) {
        callback(false);
      }
    }
  };

  const usassignLabelFromTask = async (
    pipelineId: string,
    taskId: string,
    labelId: string,
    callback?: (success: boolean) => void,
  ) => {
    try {
      await unassignLabelFromTaskRequest(pipelineId, taskId, labelId);
      toast.success(__("Label unassigned from task", "quicktasker"));
      if (callback) {
        callback(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to unassign label from task", "quicktasker"));
      if (callback) {
        callback(false);
      }
    }
  };

  return {
    getPipelineLabels,
    createPipelineLabel,
    editLabel,
    assignLabelToTask,
    usassignLabelFromTask,
  };
}

export { useLabelActions };
