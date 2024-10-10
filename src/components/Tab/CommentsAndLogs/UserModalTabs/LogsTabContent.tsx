import { toast } from "react-toastify";
import { __ } from "@wordpress/i18n";
import {
  CommentsAndLogsTabContent,
  TabContentItem,
} from "../CommentsAndLogsTabContent";
import { getLogsRequest } from "../../../../api/api";
import { WPQTTypes } from "../../../../types/enums";
import { Log } from "../../../../types/log";

type Props = {
  userId: string;
};

function LogsTabContent({ userId }: Props) {
  const fetchLogs = async () => {
    try {
      const response = await getLogsRequest(userId, WPQTTypes.User);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load log", "quicktasker"));
    }
  };
  return (
    <CommentsAndLogsTabContent<Log>
      typeId={userId}
      fetchData={fetchLogs}
      renderItem={(log: Log) => <TabContentItem item={log} />}
      noDataMessage={__("No logs available", "quicktasker")}
      explanation={__(
        "Logs can be seen only by WordPress admins",
        "quicktasker",
      )}
    />
  );
}

export { LogsTabContent };
