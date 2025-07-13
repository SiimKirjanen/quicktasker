import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { addCommentRequest } from "../../api/api";
import { UserTypes } from "../../types/user";

function useCommentActions() {
  const addComment = async (
    typeId: string,
    type: UserTypes | "task",
    isPrivate: boolean,
    commentText: string,
  ) => {
    try {
      const response = await addCommentRequest(
        typeId,
        type,
        isPrivate,
        commentText,
      );
      toast.success(__("Comment added", "quicktasker"));

      return response.data.newComment;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to add comment", "quicktasker"));
    }
  };
  return {
    addComment,
  };
}

export { useCommentActions };
