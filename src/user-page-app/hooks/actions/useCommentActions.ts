import { WPQTComment } from "../../../types/comment";
import {
  addTaskCommentRequest,
  addUserCommentRequest,
  getTaskCommentsRequest,
  getUserCommentsRequest,
} from "../../api/user-page-api";
import { useErrorHandler } from "../useErrorHandler";

function useCommentActions() {
  const { handleError } = useErrorHandler();

  const loadTaskComments = async (
    taskHash: string,
    callback?: (comments: WPQTComment[]) => void,
  ) => {
    try {
      const response = await getTaskCommentsRequest(taskHash);
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };
  const addTaskComment = async (
    taskHash: string,
    comment: string,
    callback?: (comments: WPQTComment[]) => void,
  ) => {
    try {
      const response = await addTaskCommentRequest(taskHash, comment);

      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const loadUserComments = async (
    callback: (comments: WPQTComment[]) => void,
  ) => {
    try {
      const response = await getUserCommentsRequest();

      callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const addUserComment = async (
    commentText: string,
    callback: (comments: WPQTComment[]) => void,
  ) => {
    try {
      const response = await addUserCommentRequest(commentText);

      callback(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return { loadTaskComments, addTaskComment, loadUserComments, addUserComment };
}

export { useCommentActions };
