import { toast } from "react-toastify";

import { getLogsRequest } from "../../../../api/api";
import { WPQTTypes } from "../../../../types/enums";
import { Log } from "../../../../types/log";
import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";

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
      renderItem={(log: Log) => <TabContentItem log={log} />}
      noDataMessage="No logs available"
      explanation="Logs can be seen only by WordPress admins"
    />
  );
}

export { LogsTabContent };
