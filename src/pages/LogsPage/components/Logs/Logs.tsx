import { __ } from "@wordpress/i18n";
import { NoFilterResults } from "../../../../components/Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../../../components/Loading/Loading";
import { LogHeader, LogItem } from "../../../../components/Log/LogItem";
import { Log } from "../../../../types/log";

type Props = {
  logs: Log[];
  loading: boolean;
};
const Logs = ({ logs, loading }: Props) => {
  if (loading) {
    return <Loading ovalSize="64" className="wpqt-mt-12" />;
  }

  if (logs.length === 0) {
    return <NoFilterResults text={__("No logs found", "quicktasker")} />;
  }

  return (
    <div className="wpqt-logs-page-grid">
      <LogHeader title={__("Author", "quicktasker")} />
      <LogHeader title={__("Created at", "quicktasker")} />
      <LogHeader title={__("Status", "quicktasker")} />
      <LogHeader title={__("Text", "quicktasker")} />
      {logs.map((log) => (
        <LogItem key={log.id} log={log} showStatus={true} />
      ))}
    </div>
  );
};

export { Logs };
