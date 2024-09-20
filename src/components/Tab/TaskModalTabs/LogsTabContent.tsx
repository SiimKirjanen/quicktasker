import { toast } from "react-toastify";
import { addLogRequest, getTaskLogs } from "../../../api/api";
import { Log } from "../../../types/log";
import { TabContent, TabContentItem } from "./TabContent";
import { WPQTTypes } from "../../../types/enums";

type Props = {
  taskId: string;
};

function LogsTabContent({ taskId }: Props) {
  const addLog = async (text: string) => {
    try {
      const response = await addLogRequest(taskId, WPQTTypes.Task, text);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add log");
    }
  };
  const fetchLogs = async () => {
    try {
      const response = await getTaskLogs(taskId);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get log");
    }
  };
  return (
    <TabContent<Log>
      taskId={taskId}
      fetchData={fetchLogs}
      onAdd={addLog}
      renderItem={(log: Log) => <TabContentItem item={log} />}
      noDataMessage="No logs available"
      explanation="Logs can be seen only by WordPress admins"
    />
  );
}

export { LogsTabContent };
