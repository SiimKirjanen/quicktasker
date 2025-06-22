import { useContext } from "@wordpress/element";
import { BsFiletypeJson } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import { CHANGE_TASK_EXPORT_MODAL_METHOD } from "../../../../constants";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../../types/task";

function PipelineExportTypeSelection() {
  const {
    modalDispatch,
    state: { taskExportModalSettings },
  } = useContext(ModalContext);

  return (
    <div className="wpqt-flex wpqt-gap-2">
      <div
        className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border-none wpqt-cursor-pointer ${
          taskExportModalSettings.selectedMethod === TaskExportMethods.PDF
            ? "wpqt-border wpqt-border-blue-500 !wpqt-border-solid"
            : ""
        }`}
        onClick={() =>
          modalDispatch({
            type: CHANGE_TASK_EXPORT_MODAL_METHOD,
            payload: { selectedMethod: TaskExportMethods.PDF },
          })
        }
        data-testid="task-export-pdf-icon"
      >
        <FaRegFilePdf className="wpqt-size-5 wpqt-pdf-red" />
      </div>
      <div
        className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border-none wpqt-cursor-pointer ${
          taskExportModalSettings.selectedMethod === TaskExportMethods.JSON
            ? "wpqt-border wpqt-border-blue-500 !wpqt-border-solid"
            : ""
        }`}
        onClick={() =>
          modalDispatch({
            type: CHANGE_TASK_EXPORT_MODAL_METHOD,
            payload: { selectedMethod: TaskExportMethods.JSON },
          })
        }
        data-testid="task-export-json-icon"
      >
        <BsFiletypeJson className="wpqt-size-5" />
      </div>
    </div>
  );
}

export { PipelineExportTypeSelection };
