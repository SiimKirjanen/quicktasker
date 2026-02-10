import { toast } from "react-toastify";

import { __ } from "@wordpress/i18n";
import { getLogsRequest } from "../../../../api/api";
import { WPQTTypes } from "../../../../types/enums";
import { Log } from "../../../../types/log";
import { LogBox } from "../../../LogBox/LogBox";
import { CommentsAndLogsTabContent } from "../CommentsAndLogsTabContent";

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
      toast.error(__("Failed to get logs", "quicktasker"));
    }
  };
  return (
    <CommentsAndLogsTabContent<Log>
      typeId={taskId}
      fetchData={fetchLogs}
      renderItem={(log: Log) => <LogBox log={log}>{log.text}</LogBox>}
      noDataMessage={__("No logs available", "quicktasker")}
    />
  );
}

export { LogsTabContent };
