import { useContext, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { FaTrello } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import {
  CLOSE_PIPELINE_IMPORT_MODAL,
  PIPELINE_ADD_PIPELINE,
} from "../../../constants";
import { useImportActions } from "../../../hooks/actions/useImportActions";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { PipelinesContext } from "../../../providers/PipelinesContextProvider";
import { PipelineImportSource, WPQTImport } from "../../../types/imports";
import { normalizeTrelloImport } from "../../../utils/import/normalize-import";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { WPQTModal } from "../WPQTModal";

function ImportPipelineModal() {
  const {
    state: { pipelineImportModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { pipelinesDispatch } = useContext(PipelinesContext);
  const { fetchAndSetPipelineData } = useContext(ActivePipelineContext);
  const [selectedImportSource] = useState(PipelineImportSource.TRELLO);
  const [importData, setImportData] = useState<WPQTImport | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importPipeline } = useImportActions();
  const selectionText = __("Import from Trello", "quicktasker");

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target?.result as string);
          const normalizedData = normalizeTrelloImport(parsedData);
          setImportData(normalizedData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          toast.error(__("Failed to parse import file", "quicktasker"));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportStart = async () => {
    if (!importData) {
      return;
    }
    setImportLoading(true);
    const { data } = await importPipeline(selectedImportSource, importData);

    if (data) {
      pipelinesDispatch({
        type: PIPELINE_ADD_PIPELINE,
        payload: data.pipeline,
      });
      await fetchAndSetPipelineData(data.pipeline.id);
      resetState();
      modalDispatch({ type: CLOSE_PIPELINE_IMPORT_MODAL });
      toast.success(__("Board imported", "quicktasker"));
    }
    setImportLoading(false);
  };

  const resetState = () => {
    setImportData(null);
  };

  return (
    <WPQTModal
      modalOpen={pipelineImportModalOpen}
      closeModal={() => {
        modalDispatch({ type: CLOSE_PIPELINE_IMPORT_MODAL });
        resetState();
      }}
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
        <div className="wpqt-text-lg">{__("Import board", "quicktasker")}</div>

        <div>
          <div
            className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-cursor-pointer ${
              selectedImportSource === PipelineImportSource.TRELLO
                ? "wpqt-border wpqt-border-blue-500"
                : ""
            }`}
          >
            <FaTrello className="wpqt-size-5 wpqt-trello-blue" />
          </div>
        </div>

        <p className="wpqt-my-0 wpqt-mb-2">{selectionText}</p>

        {!importData && (
          <WPQTIconButton
            text={__("Select import file", "quicktasker")}
            onClick={handleFileButtonClick}
            icon={<MdFileUpload className="wpqt-size-5 wpqt-text-blue-500" />}
          />
        )}

        {importData && (
          <ImportInfo
            importData={importData}
            onNameChange={(newName) => {
              setImportData((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    pipelineName: newName,
                  };
                }
                return prev;
              });
            }}
            onDescriptionChange={(newDescription) => {
              setImportData((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    pipelineDescription: newDescription,
                  };
                }
                return prev;
              });
            }}
          />
        )}
        {importData && (
          <WPQTIconButton
            text={__("Start import", "quicktasker")}
            onClick={handleImportStart}
            loading={importLoading}
          />
        )}

        <input
          type="file"
          ref={fileInputRef}
          id="import-upload"
          className="wpqt-hidden"
          accept=".json"
          onChange={handleFileChange}
        />
      </div>
    </WPQTModal>
  );
}

type ImportInfoProps = {
  importData: WPQTImport;
  onNameChange: (newName: string) => void;
  onDescriptionChange: (newDescription: string) => void;
};
function ImportInfo({
  importData,
  onNameChange,
  onDescriptionChange,
}: ImportInfoProps) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-2">
      <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-1">
        {__("Board name", "quicktasker")}{" "}
        <WPQTInput
          value={importData.pipelineName}
          onChange={onNameChange}
          wrapperClassName="wpqt-w-[200px]"
          className="wpqt-w-full"
        />
      </div>
      <div>
        {__("Board description", "quicktasker")}{" "}
        <WPQTTextarea
          value={importData.pipelineDescription}
          onChange={onDescriptionChange}
          rowsCount={2}
          className="!wpqt-w-[200px]"
        />
      </div>

      <div>
        {__("Number of tasks", "quicktasker")}:{" "}
        <span className="wpqt-font-semibold">
          {importData.tasks.length} ({__("archived", "quicktasker")}{" "}
          {importData.tasks.filter((task) => task.archived).length})
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

export { ImportPipelineModal };
