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
  validateQuicktaskerImport,
  validateTrelloImport,
} from "../../../utils/import/validate-import";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTModal } from "../WPQTModal";
import { getSelectionInfoText, getSelectionText } from "./import-modal-utils";
import { ImportConfig } from "./ImportConfig";
import { ImportInfo } from "./ImportInfo";
import { ImportSourceSelection } from "./importSourceSelection";

const defaultImportFilter: WPQTImportFilter = {
  includeArchivedTasks: true,
  includeTaskComments: false,
  includeTaskCustomFields: true,
  sourcePipelinesFilter: [],
};

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
    ...defaultImportFilter,
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
            case PipelineImportSource.QUICKTASKER: {
              const validationResult = validateQuicktaskerImport(parsedData);

              if (validationResult !== true) {
                toast.error(
                  `${__("Invalid Quicktasker import", "quicktasker")}: ${validationResult}`,
                );
                return;
              }
              normalizedData = parsedData as WPQTImport;

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

  const getAcceptedFileTypes = () => {
    switch (selectedImportSource) {
      case PipelineImportSource.PIPEDRIVE:
        return ".csv";
      case PipelineImportSource.TRELLO:
      case PipelineImportSource.ASANA:
      case PipelineImportSource.QUICKTASKER:
        return ".json";
      default:
        return ".json";
    }
  };

  const resetState = () => {
    setImportData(null);
    setFilteredImportData(null);
    setImportDataFilter({ ...defaultImportFilter });
  };

  useEffect(() => {
    if (importData) {
      // First, filter the tasks based on archive status
      const filteredTasks = importData.tasks.filter(
        (task) => importDataFilter.includeArchivedTasks || !task.archived,
      );

      // Create a set of valid task IDs for quick lookup
      const validTaskIds = new Set(filteredTasks.map((task) => task.taskId));

      // Filter task comments - only include those related to non-archived tasks
      // and only if includeTaskComments is true
      const filteredTaskComments = importDataFilter.includeTaskComments
        ? importData.taskComments.filter((comment) =>
            validTaskIds.has(comment.taskId),
          )
        : [];

      // Filter task custom fields if includeTaskCustomFields is false
      if (!importDataFilter.includeTaskCustomFields) {
        filteredTasks.forEach((task) => {
          task.customFields = [];
        });
      }

      // Filter out archived tasks if the filter is not set to include them
      const filteredData: WPQTImport = {
        ...importData,
        tasks: filteredTasks,
        taskComments: filteredTaskComments,
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
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-4">
        <div className="wpqt-text-lg">{__("Import board", "quicktasker")}</div>

        <ImportSourceSelection
          selectedImportSource={selectedImportSource}
          handleImportSourceChange={handleImportSourceChange}
        />

        <div className="wpqt-text-center wp-mb-4">
          <p className="wpqt-my-0">{getSelectionText(selectedImportSource)}</p>
          <p className="wpqt-my-0">
            {getSelectionInfoText(selectedImportSource)}
          </p>
        </div>

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
