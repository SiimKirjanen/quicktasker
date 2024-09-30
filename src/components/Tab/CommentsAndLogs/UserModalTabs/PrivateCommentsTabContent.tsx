import { toast } from "react-toastify";

import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";
import { addCommentRequest, getComments } from "../../../../api/api";
import { WPQTTypes } from "../../../../types/enums";
import { WPQTComment } from "../../../../types/comment";
import { convertCommentFromServer } from "../../../../utils/comment";

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

      return convertCommentFromServer(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add private note");
    }
  };

  const fetchPrivateComments = async () => {
    try {
      const response = await getComments(userId, WPQTTypes.User, true);

      return response.data.map(convertCommentFromServer);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load private notes");
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={userId}
      fetchData={fetchPrivateComments}
      onAdd={addComment}
      renderItem={(comment: WPQTComment) => <TabContentItem item={comment} />}
      noDataMessage="No notes available"
      explanation="Notes that can be added and viewed only by WordPress admins."
    />
  );
}

export { PrivateCommentsTabContent };
