import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  addMyTasksCommentRequest,
  getMyTasksCommentsRequest,
} from "../../../api/api";
import { WPQTComment } from "../../../types/comment";
import { CommentBox } from "../../CommentBox/CommentBox";
import { CommentsAndLogsTabContent } from "../../Tab/CommentsAndLogs/CommentsAndLogsTabContent";

type Props = {
  taskId: string;
};

function MyTasksCommentsContent({ taskId }: Props) {
  const fetchComments = async () => {
    try {
      const response = await getMyTasksCommentsRequest(taskId);
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load comments", "quicktasker"));
    }
  };

  const onAddComment = async (newEntry: string) => {
    try {
      const response = await addMyTasksCommentRequest(taskId, newEntry);
      if (response?.success) {
        return response.data.newComment;
      }
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to add comment", "quicktasker"));
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={taskId}
      fetchData={fetchComments}
      onAdd={onAddComment}
      renderItem={(comment: WPQTComment) => (
        <CommentBox
          authorName={comment.author_name ?? ""}
          authorType={comment.author_type}
          commentDate={comment.created_at}
          key={comment.id}
        >
          {comment.text}
        </CommentBox>
      )}
      noDataMessage={__("No comments available", "quicktasker")}
      enableAdd={true}
    />
  );
}

export { MyTasksCommentsContent };
