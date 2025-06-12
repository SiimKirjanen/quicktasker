import { useTimezone } from "../../hooks/useTimezone";
import { Log } from "../../types/log";
import { logCreatedByString } from "../../utils/log";

type Props = {
  log: Log;
  showStatus?: boolean;
};
const LogItem = ({ log, showStatus = false }: Props) => {
  const { convertToWPTimezone } = useTimezone();
  const createdBy = logCreatedByString[log.created_by];

  return (
    <>
      <div>
        <div className="wpqt-text-center wpqt-mb-1">{log.author_name}</div>
        <div className="wpqt-text-center">{createdBy}</div>
      </div>
      <div>{convertToWPTimezone(log.created_at)}</div>
      {showStatus && <div>{log.log_status}</div>}
      <div>{log.text}</div>
    </>
  );
};

type LogHeaderProps = {
  title: string;
};

function LogHeader({ title }: LogHeaderProps) {
  return (
    <div className="wpqt-font-semibold wpqt-text-lg wpqt-underline">
      {title}
    </div>
  );
}

export { LogHeader, LogItem };
