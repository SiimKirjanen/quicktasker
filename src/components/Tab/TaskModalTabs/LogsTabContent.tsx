import { useEffect, useState } from "@wordpress/element";
import { getTaskLogs } from "../../../api/api";
import { Log } from "../../../types/log";
import { LoadingOval } from "../../Loading/Loading";

type Props = {
  taskId: string;
};

function LogsTabContent({ taskId }: Props) {
  const [logs, setLogs] = useState<Log[] | null>(null);

  const loadLogs = async () => {
    const response = await getTaskLogs(taskId);

    setLogs(response.data);
  };
  useEffect(() => {
    loadLogs();
  }, []);

  if (logs === null) {
    return (
      <div className="wpqt-flex wpqt-justify-center">
        <LoadingOval width="30" height="30" />
      </div>
    );
  }

  if (logs.length === 0) {
    return <div>No logs available</div>;
  }

  return (
    <div>
      {logs.map((log, index) => (
        <div key={index}>{log.text}</div>
      ))}
    </div>
  );
}

export { LogsTabContent };
