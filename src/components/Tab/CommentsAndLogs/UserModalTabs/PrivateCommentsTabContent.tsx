import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { addCommentRequest, getComments } from "../../../../api/api";
import { WPQTComment } from "../../../../types/comment";
import { UserTypes } from "../../../../types/user";
import { CommentBox } from "../../../CommentBox/CommentBox";
import { CommentsAndLogsTabContent } from "../CommentsAndLogsTabContent";

type Props = {
  userId: string;
};

function PrivateCommentsTabContent({ userId }: Props) {
  const addComment = async (newEntry: string) => {
    try {
      const response = await addCommentRequest(
        userId,
        UserTypes.QUICKTASKER,
        true,
        newEntry,
      );

      return response.data.newComment;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to add private comment", "quicktasker"));
    }
  };

  const fetchPrivateComments = async () => {
    try {
      const response = await getComments(userId, UserTypes.QUICKTASKER, true);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load private comments", "quicktasker"));
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={userId}
      fetchData={fetchPrivateComments}
      onAdd={addComment}
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

export { PrivateCommentsTabContent };
