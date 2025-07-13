import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { TaskFromServer } from "../../../types/task";
import {
  assignTaskToUser,
  changeTaskDoneStatusRequest,
  changeTaskStageRequest,
  getTaskDataRequest,
  unAssignTaskFromUser,
} from "../../api/user-page-api";
import { UserPageTaskResponse } from "../../types/user-page-task-response";
import { useErrorHandler } from "../useErrorHandler";

function useTaskActions() {
  const { handleError } = useErrorHandler();

  const getTask = async (
    taskHash: string,
    callback?: (data: UserPageTaskResponse) => void,
  ) => {
    try {
      const response = await getTaskDataRequest(taskHash);
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const assignToTask = async (
    taskHash: string,
    callback?: (task: TaskFromServer) => void,
  ) => {
    try {
      const response = await assignTaskToUser(taskHash);
      toast.success(__("Task assigned successfully", "quicktasker"));
      if (callback) callback(response.data.task);
    } catch (error) {
      handleError(error);
    }
  };

  const unAssignFromTask = async (
    taskHash: string,
    callback?: (task: TaskFromServer) => void,
  ) => {
    try {
      const response = await unAssignTaskFromUser(taskHash);
      toast.success(__("Task unassigned successfully", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const changeTaskStage = async (
    taskHash: string,
    stageId: string,
    callback?: () => void,
  ) => {
    try {
      await changeTaskStageRequest(taskHash, stageId);
      toast.success(__("Task stage changed successfully", "quicktasker"));
      if (callback) callback();
    } catch (error) {
      handleError(error);
    }
  };

  const changeTaskDoneStatus = async (
    taskHash: string,
    doneStatus: boolean,
    callback?: (doneStatus: boolean) => void,
  ) => {
    try {
      const successMessage = doneStatus
        ? __("Task marked as completed", "quicktasker")
        : __("Task marked as incomplete", "quicktasker");
      await changeTaskDoneStatusRequest(taskHash, doneStatus);
      toast.success(successMessage);
      if (callback) callback(doneStatus);
    } catch (error) {
      handleError(error);
    }
  };

  return {
    getTask,
    assignToTask,
    changeTaskStage,
    unAssignFromTask,
    changeTaskDoneStatus,
  };
}

export { useTaskActions };
