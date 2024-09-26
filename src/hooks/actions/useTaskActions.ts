import { toast } from "react-toastify";
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
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete a task");
    }
  };

  const archiveTask = async (taskId: string, callback?: () => void) => {
    try {
      await archiveTaskRequest(taskId);
      if (callback) callback();
      toast.success("Task archived successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to archive a task");
    }
  };

  const restoreArchivedTask = async (taskId: string, callback?: () => void) => {
    try {
      await restoreArchivedTaskRequest(taskId);
      if (callback) callback();
      toast.success("Task restored successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to restore a task");
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
      toast.success("Task unassigned successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to unassign task. Please try again");
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
