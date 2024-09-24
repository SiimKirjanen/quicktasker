import { toast } from "react-toastify";
import { addCommentRequest } from "../../api/api";
import { WPQTTypes } from "../../types/enums";

function useCommentActions() {
  const addComment = async (
    typeId: string,
    type: WPQTTypes,
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
      toast.success("Comment added successfully");

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };
  return {
    addComment,
  };
}

export { useCommentActions };
