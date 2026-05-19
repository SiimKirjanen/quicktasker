import { __ } from "@wordpress/i18n";
import { useTimezone } from "../../hooks/useTimezone";
import { WPQTLogCreatedBy } from "../../types/enums";
import { Log, LogStatusEnum } from "../../types/log";
import { logCreatedByString } from "../../utils/log";

function LogsTable({
  logs,
  showBoard = false,
}: {
  logs: Log[];
  showBoard?: boolean;
}) {
  const gridCols = showBoard
    ? "wpqt-grid-cols-[auto_auto_auto_auto_auto]"
    : "wpqt-grid-cols-[auto_auto_auto_auto]";
  return (
    <div className="wpqt-overflow-x-auto">
      <div
        className={`wpqt-inline-grid wpqt-min-w-[640px] ${gridCols} wpqt-items-center wpqt-gap-x-8 wpqt-gap-y-3`}
      >
        <div className="wpqt-mb-2 wpqt-font-bold">
          {__("Status", "quicktasker")}
        </div>
        <div className="wpqt-mb-2 wpqt-font-bold">
          {__("Created at", "quicktasker")}
        </div>
        <div className="wpqt-mb-2 wpqt-font-bold">
          {__("Author", "quicktasker")}
        </div>
        {showBoard && (
          <div className="wpqt-mb-2 wpqt-font-bold">
            {__("Board", "quicktasker")}
          </div>
        )}
        <div className="wpqt-mb-2 wpqt-font-bold">
          {__("Message", "quicktasker")}
        </div>
        {logs.map((log) => (
          <LogRow log={log} showBoard={showBoard} key={log.id} />
        ))}
      </div>
    </div>
  );
}

function LogRow({ log, showBoard }: { log: Log; showBoard: boolean }) {
  const { convertToWPTimezone } = useTimezone();
  const createdBy = logCreatedByString[log.created_by];
  const isAnonymous = log.created_by === WPQTLogCreatedBy.Anonymous;
  const isError = log.log_status === LogStatusEnum.Error;
  return (
    <>
      <span
        className={`wpqt-h-2 wpqt-w-2 wpqt-rounded-full ${
          isError ? "wpqt-bg-red-500" : "wpqt-bg-green-500"
        }`}
        title={isError ? "Error" : "Success"}
      />
      <span className="wpqt-text-gray-500 wpqt-tabular-nums">
        {convertToWPTimezone(log.created_at)}
      </span>
      <span>
        {isAnonymous ? (
          <span className="wpqt-font-semibold">{createdBy}</span>
        ) : (
          <>
            <span className="wpqt-font-semibold">{log.author_name}</span>
            <span className="wpqt-text-gray-500"> ({createdBy})</span>
          </>
        )}
      </span>
      {showBoard && (
        <span className="wpqt-text-gray-500">{log.pipeline_name ?? "—"}</span>
      )}
      <span>{log.text}</span>
    </>
  );
}

export { LogsTable };
