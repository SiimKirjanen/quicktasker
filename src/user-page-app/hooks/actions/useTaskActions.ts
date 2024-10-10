import { toast } from "react-toastify";
import { __ } from "@wordpress/i18n";
import { TaskFromServer } from "../../../types/task";
import {
  assignTaskToUser,
  changeTaskStageRequest,
  getTaskDataRequest,
  unAssignTaskFromUser,
} from "../../api/user-page-api";
import { useErrorHandler } from "../useErrorHandler";
import { UserPageTaskResponse } from "../../types/user-page-task-response";

function useTaskActions() {
  const { handleError } = useErrorHandler();

  const getTask = async (
    pageHash: string,
    taskHash: string,
    callback?: (data: UserPageTaskResponse) => void,
  ) => {
    try {
      const response = await getTaskDataRequest(pageHash, taskHash);
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const assignToTask = async (
    pageHash: string,
    taskHash: string,
    callback?: (task: TaskFromServer) => void,
  ) => {
    try {
      const response = await assignTaskToUser(pageHash, taskHash);
      toast.success(__("Task assigned successfully", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const unAssignFromTask = async (
    pageHash: string,
    taskHash: string,
    callback?: (task: TaskFromServer) => void,
  ) => {
    try {
      const response = await unAssignTaskFromUser(pageHash, taskHash);
      toast.success(__("Task unassigned successfully", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const changeTaskStage = async (
    taskHash: string,
    stageId: string,
    pageHash: string,
    callback?: (data: UserPageTaskResponse) => void,
  ) => {
    try {
      const response = await changeTaskStageRequest(
        pageHash,
        taskHash,
        stageId,
      );
      toast.success(__("Task stage changed successfully", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return { getTask, assignToTask, changeTaskStage, unAssignFromTask };
}

export { useTaskActions };
