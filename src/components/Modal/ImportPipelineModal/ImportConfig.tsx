import { __ } from "@wordpress/i18n";
import {
  PipelineImportSource,
  WPQTImport,
  WPQTImportFilter,
} from "../../../types/imports";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { Toggle } from "../../common/Toggle/Toggle";

type ImportConfigProps = {
  importData: WPQTImport;
  importDataFilter: WPQTImportFilter;
  selectedImportSource: PipelineImportSource;
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
  selectedImportSource,
  onNameChange,
  onDescriptionChange,
  onImportDataFilterChange,
  validation,
}: ImportConfigProps) {
  const allowSourceSelection =
    selectedImportSource === PipelineImportSource.PIPEDRIVE;

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3 wpqt-mb-3">
      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-1">
        <ConfigTitle title={__("Board name", "quicktasker")} />
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
        <ConfigTitle title={__("Board description", "quicktasker")} />
        <WPQTTextarea
          value={importData.pipelineDescription}
          onChange={onDescriptionChange}
          rowsCount={2}
          className="!wpqt-w-[200px] !wpqt-mb-0"
        />
      </div>

      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-2 wpqt-w-[200px]">
        <ConfigTitle title={__("Import archived tasks?", "quicktasker")} />

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

      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-2 wpqt-w-[200px]">
        <ConfigTitle title={__("Import task comments?", "quicktasker")} />

        <Toggle
          checked={importDataFilter.includeTaskComments}
          handleChange={() => {
            onImportDataFilterChange({
              ...importDataFilter,
              includeTaskComments: !importDataFilter.includeTaskComments,
            });
          }}
        />
      </div>

      {allowSourceSelection && (
        <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-2 wpqt-w-[200px]">
          <ConfigTitle title={__("Filter by source", "quicktasker")} />

          {importData.sourcePipelines.map((source) => {
            const isSourceSelected =
              importDataFilter.sourcePipelinesFilter.some(
                (filter) => filter.id === source.id,
              );
            const inputId = `source-${source.id}`;

            return (
              <div
                key={source.id}
                className="wpqt-flex wpqt-items-center wpqt-gap-2"
              >
                <label htmlFor={inputId}>{source.name}</label>
                <input
                  type="checkbox"
                  value={source.name}
                  id={inputId}
                  checked={isSourceSelected}
                  onChange={() => {
                    let newSourcePipelinesFilter;

                    if (isSourceSelected) {
                      // Remove from filter if already selected
                      newSourcePipelinesFilter =
                        importDataFilter.sourcePipelinesFilter.filter(
                          (filter) => filter.id !== source.id,
                        );
                    } else {
                      // Add to filter if not already selected
                      newSourcePipelinesFilter = [
                        ...importDataFilter.sourcePipelinesFilter,
                        source,
                      ];
                    }

                    onImportDataFilterChange({
                      ...importDataFilter,
                      sourcePipelinesFilter: newSourcePipelinesFilter,
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

type ImportConfigTitleProps = {
  title: string;
};
function ConfigTitle({ title }: ImportConfigTitleProps) {
  return <div className="wpqt-font-semibold">{title}</div>;
}

export { ImportConfig };
