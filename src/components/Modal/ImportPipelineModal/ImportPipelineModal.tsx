import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { FaTrello } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import {
  CLOSE_PIPELINE_IMPORT_MODAL,
  PIPELINE_ADD_PIPELINE,
} from "../../../constants";
import { useImportActions } from "../../../hooks/actions/useImportActions";
import { usePipelines } from "../../../hooks/usePipelines";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import {
  PipelineImportSource,
  WPQTImport,
  WPQTImportFilter,
} from "../../../types/imports";
import { normalizeTrelloImport } from "../../../utils/import/normalize-import";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";
import { ImportConfig } from "./ImportConfig";
import { ImportInfo } from "./ImportInfo";

function ImportPipelineModal() {
  const {
    state: { pipelineImportModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { pipelinesDispatch, checkIfPipelineNameExists } = usePipelines();
  const { fetchAndSetPipelineData } = useContext(ActivePipelineContext);
  const [selectedImportSource] = useState(PipelineImportSource.TRELLO);
  const [importData, setImportData] = useState<WPQTImport | null>(null);
  const [importDataFilter, setImportDataFilter] = useState<WPQTImportFilter>({
    includeArchivedTasks: true,
  });
  const [filteredImportData, setFilteredImportData] =
    useState<WPQTImport | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importPipeline } = useImportActions();
  const selectionText = __("Import from Trello", "quicktasker");
  const pipelineNameExists = useMemo(() => {
    if (!importData?.pipelineName) {
      return false;
    }
    return checkIfPipelineNameExists(importData.pipelineName);
  }, [importData?.pipelineName]);
  const canStartImport = filteredImportData && !pipelineNameExists;

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
    if (!filteredImportData || pipelineNameExists) {
      return;
    }
    setImportLoading(true);
    const { data } = await importPipeline(
      selectedImportSource,
      filteredImportData,
    );

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

  useEffect(() => {
    if (importData) {
      const filteredData: WPQTImport = {
        ...importData,
        tasks: importData.tasks.filter(
          (task) => importDataFilter.includeArchivedTasks || !task.archived,
        ),
      };
      setFilteredImportData(filteredData);
    }
  }, [importData, importDataFilter]);

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
          <ImportConfig
            importData={importData}
            importDataFilter={importDataFilter}
            validation={{ pipelineNameExists: pipelineNameExists }}
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
            onImportDataFilterChange={setImportDataFilter}
          />
        )}

        {filteredImportData && <ImportInfo importData={filteredImportData} />}
        {canStartImport && (
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

export { ImportPipelineModal };
