import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { CLOSE_TASK_MODAL, PIPELINE_EDIT_TASK } from "../../../constants";
import { editTaskRequest } from "../../../api/api";
import { TaskModalContent } from "./TaskModalContent";
import { WPQTModal } from "../WPQTModal";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { Task, TaskFromServer } from "../../../types/task";

type Props = {
  editTaskCallback?: (task: TaskFromServer) => void;
};
function TaskModal({ editTaskCallback }: Props) {
  const {
    state: { taskModalOpen },
  } = useContext(ModalContext);

  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError,
  } = useModal(CLOSE_TASK_MODAL);

  const editTask = async (task: Task) => {
    try {
      setModalSaving(true);
      const response = await editTaskRequest(task);

      handleSuccess(
        PIPELINE_EDIT_TASK,
        response.data,
        DispatchType.ACTIVE_PIPELINE,
      );
      if (editTaskCallback) {
        editTaskCallback(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={taskModalOpen} closeModal={closeModal} size="xl">
      <TaskModalContent
        ref={modalContentRef}
        editTask={editTask}
        taskModalSaving={modalSaving}
      />
    </WPQTModal>
  );
}

export { TaskModal };
