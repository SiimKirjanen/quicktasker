import { toast } from "react-toastify";
import { addCommentRequest, getComments } from "../../../api/api";
import { WPQTComment } from "../../../types/comment";
import { TabContent, TabContentItem } from "./TabContent";
import { WPQTTypes } from "../../../types/enums";

type Props = {
  taskId: string;
};

function CommentsTabContent({ taskId }: Props) {
  const addComment = async (newEntry: string) => {
    try {
      const response = await addCommentRequest(
        taskId,
        WPQTTypes.Task,
        true,
        newEntry,
      );

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };

  const fetchPrivateComments = async () => {
    try {
      const response = await getComments(taskId, "task", true);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get comment");
    }
  };

  return (
    <TabContent<WPQTComment>
      taskId={taskId}
      fetchData={fetchPrivateComments}
      onAdd={addComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No comments available"
      explanation="Comments that can be added and viewed by WordPress admins."
    />
  );
}

export { CommentsTabContent };
