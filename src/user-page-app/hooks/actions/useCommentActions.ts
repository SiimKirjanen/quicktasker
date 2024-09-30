import { useContext } from "@wordpress/element";
import { WPQTComment, WPQTCommentFromServer } from "../../../types/comment";
import {
  addTaskCommentRequest,
  getTaskCommentsRequest,
} from "../../api/user-page-api";
import { useErrorHandler } from "../useErrorHandler";
import { UserPageAppContext } from "../../providers/UserPageAppContextProvider";
import { convertCommentFromServer } from "../../../utils/comment";

function useCommentActions() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();

  const loadTaskComments = async (
    pageHash: string,
    taskHash: string,
    callback?: (comments: WPQTCommentFromServer[]) => void,
  ) => {
    try {
      const response = await getTaskCommentsRequest(pageHash, taskHash);
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
      const response = await addTaskCommentRequest(pageHash, taskHash, comment);
      const comments = response.data.map(convertCommentFromServer);
      if (callback) callback(comments);
    } catch (error) {
      handleError(error);
    }
  };

  return { loadTaskComments, addTaskComment };
}

export { useCommentActions };
