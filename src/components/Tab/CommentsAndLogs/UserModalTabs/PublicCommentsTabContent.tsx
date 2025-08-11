import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getComments } from "../../../../api/api";
import { useCommentActions } from "../../../../hooks/actions/useCommentActions";
import { WPQTComment } from "../../../../types/comment";
import { UserTypes } from "../../../../types/user";
import {
  CommentsAndLogsTabContent,
  TabContentCommentItem,
} from "../CommentsAndLogsTabContent";

type Props = {
  userId: string;
};

function PublicCommentsTabContent({ userId }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    const commentFromServer = await addComment(
      userId,
      UserTypes.QUICKTASKER,
      false,
      newEntry,
    );

    if (commentFromServer) {
      return commentFromServer;
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(userId, UserTypes.QUICKTASKER, false);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load comments", "quicktasker"));
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={userId}
      fetchData={fetchComments}
      onAdd={onAddComment}
      renderItem={(comment: WPQTComment) => (
        <TabContentCommentItem item={comment} />
      )}
      noDataMessage={__("No comments available", "quicktasker")}
      enableAdd={true}
    />
  );
}

export { PublicCommentsTabContent };
