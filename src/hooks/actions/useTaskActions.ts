import { toast } from "react-toastify";
import { __ } from "@wordpress/i18n";
import {
  archiveTaskRequest,
  deleteTaskRequest,
  removeTaskFromUserRequest,
  restoreArchivedTaskRequest,
} from "../../api/api";

const useTaskActions = () => {
  const deleteTask = async (taskId: string, callback?: () => void) => {
    try {
      await deleteTaskRequest(taskId);
      if (callback) callback();
      toast.success(__("Task deleted successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to delete a task", "quicktasker"));
    }
  };

  const archiveTask = async (taskId: string, callback?: () => void) => {
    try {
      await archiveTaskRequest(taskId);
      if (callback) callback();
      toast.success(__("Task archived successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to archive a task", "quicktasker"));
    }
  };

  const restoreArchivedTask = async (taskId: string, callback?: () => void) => {
    try {
      await restoreArchivedTaskRequest(taskId);
      if (callback) callback();
      toast.success(__("Task restored successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to restore a task", "quicktasker"));
    }
  };

  const removeTaskFromUser = async (
    userId: string,
    taskId: string,
    callback?: () => void,
  ) => {
    try {
      await removeTaskFromUserRequest(userId, taskId);
      if (callback) callback();
      toast.success(__("Task has been unassigned", "quicktasker"));
    } catch (error) {
      console.error(error);
      toast.error(__("Task unassignment failed. Try again", "quicktasker"));
    }
  };

  return {
    deleteTask,
    archiveTask,
    restoreArchivedTask,
    removeTaskFromUser,
  };
};

export { useTaskActions };
