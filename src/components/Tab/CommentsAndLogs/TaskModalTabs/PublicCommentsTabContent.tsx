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
  taskId: string;
};

function PublicCommentsTabContent({ taskId }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    const response = await addComment(taskId, WPQTTypes.Task, false, newEntry);

    if (response) {
      return convertCommentFromServer(response);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(taskId, WPQTTypes.Task, false);

      return response.data.map(convertCommentFromServer);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notes");
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={taskId}
      fetchData={fetchComments}
      onAdd={onAddComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No notes available"
      explanation="Notes that can be added and viewed by both WordPress admins and QuickTasker users who have access to the task."
    />
  );
}

export { PublicCommentsTabContent };
