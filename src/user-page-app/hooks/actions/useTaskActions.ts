import { toast } from "react-toastify";
import { TaskFromServer } from "../../../types/task";
import {
  assignTaskToUser,
  changeTaskStageRequest,
} from "../../api/user-page-api";
import { useErrorHandler } from "../useErrorHandler";
import { UserPageTaskResponse } from "../../types/user-page-task-response";

function useTaskActions() {
  const { handleError } = useErrorHandler();

  const assignToTask = async (
    pageHash: string,
    taskHash: string,
    callback?: (task: TaskFromServer) => void,
  ) => {
    try {
      const response = await assignTaskToUser(pageHash, taskHash);
      if (callback) callback(response.data);
      toast.success("Task assigned successfully");
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
      if (callback) callback(response.data);
      toast.success("Task stage changed successfully");
    } catch (error) {
      handleError(error);
    }
  };

  return { assignToTask, changeTaskStage };
}

export { useTaskActions };
