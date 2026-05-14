import { __ } from "@wordpress/i18n";
import type { StatusEntry } from "../types";

type Props = {
  entry: StatusEntry | undefined;
};

export default function SubmissionItem({ entry }: Props) {
  return (
    <li className="wpqt-public-task-submission">
      {!entry && (
        <span className="wpqt-public-task-submission-loading">
          {__("Loading…", "quicktasker")}
        </span>
      )}
      {entry && !entry.ok && entry.gone && (
        <span className="wpqt-public-task-submission-gone">
          {__("This task is no longer available.", "quicktasker")}
        </span>
      )}
      {entry && !entry.ok && !entry.gone && (
        <span className="wpqt-public-task-error">{entry.error}</span>
      )}
      {entry && entry.ok && (
        <>
          <div className="wpqt-public-task-submission-row">
            <span className="wpqt-public-task-submission-name">
              {entry.data.name}
            </span>
            <span
              className={
                entry.data.is_done
                  ? "wpqt-public-task-badge wpqt-public-task-badge-done"
                  : "wpqt-public-task-badge"
              }
            >
              {entry.data.is_done
                ? __("Completed", "quicktasker")
                : entry.data.stage_name || __("In progress", "quicktasker")}
            </span>
          </div>
          {entry.data.description && (
            <p className="wpqt-public-task-submission-description">
              {entry.data.description}
            </p>
          )}
        </>
      )}
    </li>
  );
}
