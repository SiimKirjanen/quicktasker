import { toast } from "react-toastify";
import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";
import { getComments } from "../../../../api/api";
import { WPQTComment } from "../../../../types/comment";
import { WPQTTypes } from "../../../../types/enums";
import { useCommentActions } from "../../../../hooks/actions/useCommentActions";

type Props = {
  userId: string;
};

function PublicCommentsTabContent({ userId }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    return await addComment(userId, WPQTTypes.User, false, newEntry);
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(userId, WPQTTypes.User, false);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notes");
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={userId}
      fetchData={fetchComments}
      onAdd={onAddComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No notes available"
      explanation="Notes that can be added and viewed by both WordPress admins and QuickTasker users who have access to the task."
    />
  );
}

export { PublicCommentsTabContent };
