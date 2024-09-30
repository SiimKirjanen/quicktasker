import { toast } from "react-toastify";
import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";
import { getComments } from "../../../../api/api";
import { WPQTComment } from "../../../../types/comment";
import { WPQTTypes } from "../../../../types/enums";
import { useCommentActions } from "../../../../hooks/actions/useCommentActions";
import { convertCommentFromServer } from "../../../../utils/comment";

type Props = {
  userId: string;
};

function PublicCommentsTabContent({ userId }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    const connemntFromServer = await addComment(
      userId,
      WPQTTypes.User,
      false,
      newEntry,
    );

    if (connemntFromServer) {
      return convertCommentFromServer(connemntFromServer);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(userId, WPQTTypes.User, false);

      return response.data.map(convertCommentFromServer);
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
