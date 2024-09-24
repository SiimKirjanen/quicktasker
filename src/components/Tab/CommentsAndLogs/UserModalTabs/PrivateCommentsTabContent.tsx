import { toast } from "react-toastify";

import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";
import { addCommentRequest, getComments } from "../../../../api/api";
import { WPQTTypes } from "../../../../types/enums";
import { WPQTComment } from "../../../../types/comment";

type Props = {
  userId: string;
};

function PrivateCommentsTabContent({ userId }: Props) {
  const addComment = async (newEntry: string) => {
    try {
      const response = await addCommentRequest(
        userId,
        WPQTTypes.User,
        true,
        newEntry,
      );

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user comment");
    }
  };

  const fetchPrivateComments = async () => {
    try {
      const response = await getComments(userId, WPQTTypes.User, true);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to load private comments");
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={userId}
      fetchData={fetchPrivateComments}
      onAdd={addComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No comments available"
      explanation="Comments that can be added and viewed by WordPress admins."
    />
  );
}

export { PrivateCommentsTabContent };
