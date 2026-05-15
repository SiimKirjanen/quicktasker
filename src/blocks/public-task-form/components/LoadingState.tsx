import { __ } from "@wordpress/i18n";

export default function LoadingState() {
  return (
    <div className="wpqt-public-task-loading">
      <span className="wpqt-public-task-spinner" aria-hidden="true" />
      <span>{__("Loading…", "quicktasker")}</span>
    </div>
  );
}
