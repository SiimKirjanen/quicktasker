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
  taskId: string;
};

function PublicCommentsTabContent({ taskId }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    return await addComment(taskId, WPQTTypes.Task, false, newEntry);
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(taskId, WPQTTypes.Task, false);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comment");
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={taskId}
      fetchData={fetchComments}
      onAdd={onAddComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No comments available"
      explanation="Comments that can be added and viewed by both WordPress admins and QuickTasker users who have access to the task."
    />
  );
}

export { PublicCommentsTabContent };
