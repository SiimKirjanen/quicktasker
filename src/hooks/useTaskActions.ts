import { toast } from "react-toastify";
import {
  archiveTaskRequest,
  deleteTaskRequest,
  restoreArchivedTaskRequest,
} from "../api/api";

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

  return {
    deleteTask,
    archiveTask,
    restoreArchivedTask,
  };
};

export { useTaskActions };
