import { toast } from "react-toastify";
import { addTaskCommentRequest, getTaskComments } from "../../../api/api";
import { WPQTComment } from "../../../types/comment";
import { TabContent, TabContentItem } from "./TabContent";

type Props = {
  taskId: string;
};

function PublicCommentsTabContent({ taskId }: Props) {
  const addComment = async (newEntry: string) => {
    try {
      await addTaskCommentRequest(taskId, newEntry);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <TabContent<WPQTComment>
      taskId={taskId}
      fetchData={getTaskComments}
      onAdd={addComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No comments available"
      explanation="Comments that can be added and viewed by both WordPress admins and QuickTasker users."
    />
  );
}

export { PublicCommentsTabContent };
