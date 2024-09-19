import { toast } from "react-toastify";
import { addLogRequest, getTaskLogs } from "../../../api/api";
import { Log } from "../../../types/log";
import { TabContent, TabContentItem } from "./TabContent";

type Props = {
  taskId: string;
};

function LogsTabContent({ taskId }: Props) {
  const addLog = async (text: string) => {
    try {
      await addLogRequest(taskId, "task", text);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add log");
    }
  };
  return (
    <TabContent<Log>
      taskId={taskId}
      fetchData={getTaskLogs}
      onAdd={addLog}
      renderItem={(log: Log) => <TabContentItem item={log} />}
      noDataMessage="No logs available"
      explanation="Logs can be seen only by WordPress admins"
    />
  );
}

export { LogsTabContent };
