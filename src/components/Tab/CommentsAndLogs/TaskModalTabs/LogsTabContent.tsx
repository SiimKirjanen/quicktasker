import { toast } from "react-toastify";

import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";
import { getLogsRequest } from "../../../../api/api";
import { WPQTTypes } from "../../../../types/enums";
import { Log } from "../../../../types/log";

type Props = {
  taskId: string;
};

function LogsTabContent({ taskId }: Props) {
  const fetchLogs = async () => {
    try {
      const response = await getLogsRequest(taskId, WPQTTypes.Task);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get log");
    }
  };
  return (
    <CommentsAndLogsTabContent<Log>
      typeId={taskId}
      fetchData={fetchLogs}
      renderItem={(log: Log) => <TabContentItem item={log} />}
      noDataMessage="No logs available"
      explanation="Logs can be seen only by WordPress admins"
    />
  );
}

export { LogsTabContent };
