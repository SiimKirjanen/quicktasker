import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getLogsRequest } from "../../../api/api";
import { WPQTTypes } from "../../../types/enums";
import { Log } from "../../../types/log";
import { LogBox } from "../../LogBox/LogBox";
import { CommentsAndLogsTabContent } from "./CommentsAndLogsTabContent";

type Props = {
  subjectId: string;
  subjectType: WPQTTypes;
};

function LogsTabContent({ subjectId, subjectType }: Props) {
  const fetchLogs = async () => {
    try {
      const response = await getLogsRequest(subjectId, subjectType);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load logs", "quicktasker"));
    }
  };

  return (
    <CommentsAndLogsTabContent<Log>
      typeId={subjectId}
      fetchData={fetchLogs}
      renderItem={(log: Log) => <LogBox log={log}>{log.text}</LogBox>}
      noDataMessage={__("No logs available", "quicktasker")}
    />
  );
}

export { LogsTabContent };
