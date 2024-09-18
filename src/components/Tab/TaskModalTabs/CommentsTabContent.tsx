import { getTaskComments } from "../../../api/api";
import { WPQTComment } from "../../../types/comment";
import { TabContent } from "./TabContent";

type Props = {
  taskId: string;
};

function CommentsTabContent({ taskId }: Props) {
  return (
    <TabContent<WPQTComment>
      taskId={taskId}
      fetchData={getTaskComments}
      renderItem={(comment: WPQTComment) => (
        <div key={comment.id}>{comment.text}</div>
      )}
      noDataMessage="No comments available"
    />
  );
}

export { CommentsTabContent };
