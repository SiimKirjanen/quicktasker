import { __ } from "@wordpress/i18n";
import { WPQTImport } from "../../../types/imports";

type ImportInfoProps = {
  importData: WPQTImport;
};
function ImportInfo({ importData }: ImportInfoProps) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-2">
      <div>
        {__("Number of tasks", "quicktasker")}:{" "}
        <span className="wpqt-font-semibold">
          {importData.tasks.length} ({__("archived", "quicktasker")}{" "}
          {importData.tasks.filter((task) => task.archived).length})
        </span>
      </div>
      <div>
        {__("Number of task comments", "quicktasker")}:{" "}
        <span className="wpqt-font-semibold">
          {importData.taskComments.length}
        </span>
      </div>
      <div>
        {__("Number of stages", "quicktasker")}:{" "}
        <span className="wpqt-font-semibold">{importData.stages.length}</span>
      </div>
      <div>
        {__("Number of labels", "quicktasker")}:{" "}
        <span className="wpqt-font-semibold"></span>
        {importData.labels.length}
      </div>
    </div>
  );
}
export { ImportInfo };
