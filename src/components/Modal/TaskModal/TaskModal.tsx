import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { CLOSE_TASK_MODAL, PIPELINE_EDIT_TASK } from "../../../constants";
import { editTaskRequest } from "../../../api/api";
import { TaskModalContent } from "./TaskModalContent";
import { WPQTModal } from "../WPQTModal";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { Task } from "../../../types/task";

function TaskModal() {
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
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={taskModalOpen} closeModal={closeModal} size="lg">
      <TaskModalContent
        ref={modalContentRef}
        editTask={editTask}
        taskModalSaving={modalSaving}
      />
    </WPQTModal>
  );
}

export { TaskModal };
