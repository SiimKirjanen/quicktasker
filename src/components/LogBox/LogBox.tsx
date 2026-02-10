import { useTimezone } from "../../hooks/useTimezone";
import { Log } from "../../types/log";
import { logCreatedByString } from "../../utils/log";

type Props = {
  log: Log;
  children?: React.ReactNode;
};

function LogBox({ log, children }: Props) {
  const { convertToWPTimezone } = useTimezone();
  const createdBy = logCreatedByString[log.created_by];

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-main-border wpqt-p-3">
      <div className="wpqt-flex wpqt-gap-1">
        <span className="wpqt-font-semibold">{log.author_name}</span>
        <span>({createdBy})</span>&bull;
        <span>{convertToWPTimezone(log.created_at)}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export { LogBox };
