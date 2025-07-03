import { __, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  archiveTaskRequest,
  cleanArchiveTasksRequest,
  deleteTaskRequest,
  markTaskDoneRequest,
  moveTaskRequest,
  removeTaskFromUserRequest,
  restoreArchivedTaskRequest,
  updateTaskFocusColorRequest,
} from "../../api/api";
import { UserTypes } from "../../types/user";
import { useErrorHandler } from "../useErrorHandler";
import { useAutomationActions } from "./useAutomationActions";

const useTaskActions = () => {
  const { handleExecutedAutomations } = useAutomationActions();
  const { displayErrorMessages } = useErrorHandler();

  const deleteTask = async (
    taskId: string,
    callback?: (args: {
      success: boolean;
      taskId: string;
    }) => Promise<void> | void,
  ) => {
    try {
      const response = await deleteTaskRequest(taskId);

      if (callback) {
        callback({
          success: true,
          taskId,
        });
      }
      toast.success(__("Task deleted", "quicktasker"));
      handleExecutedAutomations(response.data.executedAutomations, taskId);
    } catch (error) {
      if (callback) {
        callback({
          success: false,
          taskId,
        });
      }
      console.error(error);
      toast.error(__("Failed to delete a task", "quicktasker"));
    }
  };

  const archiveTask = async (
    taskId: string,
    callback?: (args: { success: boolean; taskId: string }) => void,
  ) => {
    try {
      await archiveTaskRequest(taskId);
      if (callback) {
        callback({
          success: true,
          taskId,
        });
      }

      toast.success(__("Task archived", "quicktasker"));
    } catch (error) {
      if (callback) {
        callback({
          success: false,
          taskId,
        });
      }
      console.error(error);
      toast.error(__("Failed to archive a task", "quicktasker"));
    }
  };

  const restoreArchivedTask = async (
    taskId: string,
    boardId: string,
    callback?: (args: { success: boolean }) => void,
  ) => {
    try {
      await restoreArchivedTaskRequest(taskId, boardId);

      if (callback) {
        callback({
          success: true,
        });
      }
      toast.success(__("Task restored", "quicktasker"));
    } catch (error) {
      console.error(error);

      if (callback) {
        callback({
          success: false,
        });
      }
      toast.error(__("Failed to restore a task", "quicktasker"));
    }
  };

  const removeTaskFromUser = async (
    userId: string,
    taskId: string,
    callback?: () => void,
  ) => {
    try {
      const response = await removeTaskFromUserRequest(
        userId,
        taskId,
        UserTypes.QUICKTASKER,
      );
      toast.success(__("Task has been unassigned", "quicktasker"));
      handleExecutedAutomations(response.data.executedAutomations, taskId);
      if (callback) callback();
    } catch (error) {
      console.error(error);
      toast.error(__("Task unassignment failed. Try again", "quicktasker"));
    }
  };

  const changeTaskDoneStatus = async (
    taskId: string,
    isCompleted: boolean,
    callback?: (isCompleted: boolean) => void,
  ) => {
    try {
      const successMessage = isCompleted
        ? __("Task marked as completed", "quicktasker")
        : __("Task marked as incomplete", "quicktasker");
      const response = await markTaskDoneRequest(taskId, isCompleted);
      if (callback) callback(isCompleted);
      toast.success(successMessage);
      handleExecutedAutomations(response.data.executedAutomations, taskId);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to change task status", "quicktasker"));
      displayErrorMessages(error);
    }
  };

  const moveTask = async (
    taskId: string,
    stageId: string,
    order: number,
    callback?: (isCompleted: boolean) => void,
  ) => {
    try {
      await moveTaskRequest(taskId, stageId, order);
      toast.success(__("Task moved", "quicktasaker"));
      if (callback) callback(true);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to move a task", "quicktasker"));
      if (callback) callback(false);
    }
  };

  const updateTaskFocusColor = async (taskId: string, color: string) => {
    const data = {
      taskId,
      color,
    };
    try {
      await updateTaskFocusColorRequest(taskId, color);

      toast.success(__("Task focus color changed", "quicktasker"));

      return {
        success: true,
        ...data,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to change task focus color", "quicktasker"));

      return {
        success: false,
        ...data,
      };
    }
  };

  const cleanupTaskArchive = async () => {
    try {
      const resp = await cleanArchiveTasksRequest();
      const deletedTaskIds = resp.data.deletedTaskIds;

      toast.success(
        sprintf(
          /* translators: %d: number of tasks removed */
          __("Removed %d orphaned tasks from archive", "quicktasker"),
          deletedTaskIds.length,
        ),
      );

      return {
        success: true,
        deletedTaskIds,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to clean up task archive", "quicktasker"));

      return {
        success: false,
        deletedTaskIds: [],
      };
    }
  };

  return {
    deleteTask,
    archiveTask,
    restoreArchivedTask,
    removeTaskFromUser,
    changeTaskDoneStatus,
    moveTask,
    updateTaskFocusColor,
    cleanupTaskArchive,
  };
};

export { useTaskActions };
