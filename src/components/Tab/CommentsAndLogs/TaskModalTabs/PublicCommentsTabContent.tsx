import { toast } from "react-toastify";
import { getComments } from "../../../../api/api";
import { useCommentActions } from "../../../../hooks/actions/useCommentActions";
import { WPQTComment } from "../../../../types/comment";
import { WPQTTypes } from "../../../../types/enums";
import { CommentBox } from "../../../CommentBox/CommentBox";
import { CommentsAndLogsTabContent } from "../CommentsAndLogsTabContent";

type Props = {
  taskId: string;
};

function PublicCommentsTabContent({ taskId }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    const response = await addComment(taskId, WPQTTypes.Task, false, newEntry);

    if (response) {
      return response;
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(taskId, WPQTTypes.Task, false);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
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
      noDataMessage="No comments available"
      enableAdd={true}
    />
  );
}

export { PublicCommentsTabContent };
