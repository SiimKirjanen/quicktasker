import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
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
import { parseCSV } from "../../../utils/import/csv-parse";
import {
  normalizeAsanaImport,
  normalizePipedriveImport,
  normalizeTrelloImport,
} from "../../../utils/import/normalize-import";
import {
  validateAsanaImport,
  validatePipedriveImport,
  validateTrelloImport,
} from "../../../utils/import/validate-import";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";
import { ImportConfig } from "./ImportConfig";
import { ImportInfo } from "./ImportInfo";
import { ImportSourceSelection } from "./importSourceSelection";

function ImportPipelineModal() {
  const {
    state: { pipelineImportModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { pipelinesDispatch, checkIfPipelineNameExists } = usePipelines();
  const { fetchAndSetPipelineData } = useContext(ActivePipelineContext);
  const [selectedImportSource, setSelectedImportSource] = useState(
    PipelineImportSource.TRELLO,
  );
  const [importData, setImportData] = useState<WPQTImport | null>(null);
  const [importDataFilter, setImportDataFilter] = useState<WPQTImportFilter>({
    includeArchivedTasks: true,
    sourcePipelinesFilter: [],
  });
  const [filteredImportData, setFilteredImportData] =
    useState<WPQTImport | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importPipeline } = useImportActions();
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
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      reader.onload = (e) => {
        try {
          let parsedData;
          let normalizedData: WPQTImport;

          if (fileExtension === "csv") {
            parsedData = parseCSV(e.target?.result as string);
          } else {
            parsedData = JSON.parse(e.target?.result as string);
          }

          switch (selectedImportSource) {
            case PipelineImportSource.TRELLO: {
              const validationResult = validateTrelloImport(parsedData);

              if (validationResult !== true) {
                toast.error(
                  `${__("Invalid Trello import", "quicktasker")}: ${validationResult}`,
                );
                return;
              }

              normalizedData = normalizeTrelloImport(parsedData);
              break;
            }
            case PipelineImportSource.ASANA: {
              const validationResult = validateAsanaImport(parsedData);

              if (validationResult !== true) {
                toast.error(
                  `${__("Invalid Asana import", "quicktasker")}: ${validationResult}`,
                );
                return;
              }
              normalizedData = normalizeAsanaImport(parsedData);
              break;
            }
            case PipelineImportSource.PIPEDRIVE: {
              const validationResult = validatePipedriveImport(parsedData);

              if (validationResult !== true) {
                toast.error(
                  `${__("Invalid Pipedrive import", "quicktasker")}: ${validationResult}`,
                );
                return;
              }
              normalizedData = normalizePipedriveImport(parsedData);
              break;
            }
            default: {
              throw new Error("Unsupported import source");
            }
          }

          setImportData(normalizedData);
        } catch (error) {
          console.error("Error parsing import file:", error);
          toast.error(__("Failed to parse import file", "quicktasker"));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportSourceChange = (source: PipelineImportSource) => {
    setSelectedImportSource(source);
    resetState();
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

  const getSelectionText = () => {
    switch (selectedImportSource) {
      case PipelineImportSource.TRELLO:
        return __("Import from Trello", "quicktasker");
      case PipelineImportSource.ASANA:
        return __("Import from Asana", "quicktasker");
      case PipelineImportSource.PIPEDRIVE:
        return __("Import from Pipedrive", "quicktasker");
      default:
        return __("Select import source", "quicktasker");
    }
  };

  const getAcceptedFileTypes = () => {
    switch (selectedImportSource) {
      case PipelineImportSource.PIPEDRIVE:
        return ".json, .csv";
      case PipelineImportSource.TRELLO:
      case PipelineImportSource.ASANA:
      default:
        return ".json";
    }
  };

  const resetState = () => {
    setImportData(null);
    setFilteredImportData(null);
  };

  useEffect(() => {
    if (importData) {
      // Filter out archived tasks if the filter is not set to include them
      const filteredData: WPQTImport = {
        ...importData,
        tasks: importData.tasks.filter(
          (task) => importDataFilter.includeArchivedTasks || !task.archived,
        ),
      };

      // Apply source pipelines filter
      if (importDataFilter.sourcePipelinesFilter.length > 0) {
        filteredData.tasks = filteredData.tasks.filter((task) =>
          importDataFilter.sourcePipelinesFilter.some(
            (pipeline) =>
              task.sourcePipeline && pipeline.id === task.sourcePipeline.id,
          ),
        );

        filteredData.stages = filteredData.stages.filter((stage) =>
          importDataFilter.sourcePipelinesFilter.some(
            (pipeline) => stage.sourcePipeline.id === pipeline.id,
          ),
        );
      }

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

        <ImportSourceSelection
          selectedImportSource={selectedImportSource}
          handleImportSourceChange={handleImportSourceChange}
        />

        <p className="wpqt-my-0 wpqt-mb-2">{getSelectionText()}</p>

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
            selectedImportSource={selectedImportSource}
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
          accept={getAcceptedFileTypes()}
          onChange={handleFileChange}
        />
      </div>
    </WPQTModal>
  );
}

export { ImportPipelineModal };
