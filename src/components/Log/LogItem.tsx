import { useTimezone } from "../../hooks/useTimezone";
import { Log } from "../../types/log";
import { logCreatedByString } from "../../utils/log";

type Props = {
  log: Log;
};
const LogItem = ({ log }: Props) => {
  const { convertToWPTimezone } = useTimezone();
  const createdBy = logCreatedByString[log.created_by];

  return (
    <>
      <div>
        <div className="wpqt-text-center wpqt-mb-1">{log.author_name}</div>
        <div className="wpqt-text-center">{createdBy}</div>
      </div>
      <div>{log.text}</div>
      <div>{convertToWPTimezone(log.created_at)}</div>
    </>
  );
};

export { LogItem };
