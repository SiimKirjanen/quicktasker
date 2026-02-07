import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsFiletypeJson } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import { OPEN_TASK_EXPORT_MODAL } from "../../../../../../constants";
import { ModalContext } from "../../../../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../../../../types/task";

function TaskExportSelection() {
  const { modalDispatch } = useContext(ModalContext);

  const openTaskExportModal = (method: TaskExportMethods) => {
    modalDispatch({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: method,
      },
    });
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mr-5 wpqt-gap-1">
      <span className="wpqt-text-sm">{__("Export", "quicktasker")}</span>
      <div className="wpqt-flex wpqt-gap-2">
        <FaRegFilePdf
          className="wpqt-size-5 wpqt-pdf-red wpqt-cursor-pointer"
          data-testid="task-export-pdf-icon"
          onClick={() => {
            openTaskExportModal(TaskExportMethods.PDF);
          }}
        />
        <BsFiletypeJson
          className="wpqt-size-5 wpqt-cursor-pointer"
          data-testid="task-export-pdf-json-icon"
          onClick={() => {
            openTaskExportModal(TaskExportMethods.JSON);
          }}
        />
      </div>
    </div>
  );
}

export { TaskExportSelection };
