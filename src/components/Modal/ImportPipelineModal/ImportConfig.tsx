import { __ } from "@wordpress/i18n";
import { WPQTImport, WPQTImportFilter } from "../../../types/imports";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { Toggle } from "../../common/Toggle/Toggle";

type ImportConfigProps = {
  importData: WPQTImport;
  importDataFilter: WPQTImportFilter;
  onNameChange: (newName: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  onImportDataFilterChange: (newFilter: WPQTImportFilter) => void;
  validation: {
    pipelineNameExists: boolean;
  };
};
function ImportConfig({
  importData,
  importDataFilter,
  onNameChange,
  onDescriptionChange,
  onImportDataFilterChange,
  validation,
}: ImportConfigProps) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-1">
        {__("Board name", "quicktasker")}
        <WPQTInput
          value={importData.pipelineName}
          onChange={onNameChange}
          wrapperClassName="wpqt-w-[200px] !wpqt-mb-0"
          className="wpqt-w-full wpqt-mb-0"
        />
        {validation.pipelineNameExists && (
          <div className="wpqt-text-red-500 wpqt-text-sm">
            {__("This board name already exists.", "quicktasker")}
          </div>
        )}
      </div>

      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-1">
        {__("Board description", "quicktasker")}
        <WPQTTextarea
          value={importData.pipelineDescription}
          onChange={onDescriptionChange}
          rowsCount={2}
          className="!wpqt-w-[200px] !wpqt-mb-0"
        />
      </div>

      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-2 wpqt-w-[200px]">
        {__("Import archived tasks?", "quicktasker")}
        <Toggle
          checked={importDataFilter.includeArchivedTasks}
          handleChange={() => {
            onImportDataFilterChange({
              ...importDataFilter,
              includeArchivedTasks: !importDataFilter.includeArchivedTasks,
            });
          }}
        />
      </div>
    </div>
  );
}

export { ImportConfig };
