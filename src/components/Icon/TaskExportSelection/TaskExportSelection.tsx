import { useContext } from "@wordpress/element";
import { FaRegFilePdf } from "react-icons/fa6";
import { OPEN_TASK_EXPORT_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../types/task";

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
    <div className="wpqt-flex wpqt-mr-4">
      <div className="wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1.5 wpqt-text-gray-500 hover:wpqt-text-gray-700">
        <FaRegFilePdf
          className="wpqt-size-5 wpqt-pdf-red"
          onClick={() => {
            openTaskExportModal(TaskExportMethods.PDF);
          }}
        />
      </div>
    </div>
  );
}

export { TaskExportSelection };
