import { getTaskLogs } from "../../../api/api";
import { Log } from "../../../types/log";
import { TabContent } from "./TabContent";

type Props = {
  taskId: string;
};

function LogsTabContent({ taskId }: Props) {
  return (
    <TabContent<Log>
      taskId={taskId}
      fetchData={getTaskLogs}
      renderItem={(log: Log) => <div key={log.id}>{log.text}</div>}
      noDataMessage="No logs available"
    />
  );
}

export { LogsTabContent };
