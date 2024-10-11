import { useContext } from "@wordpress/element";
import { editTaskRequest } from "../../../api/api";
import { CLOSE_TASK_MODAL, PIPELINE_EDIT_TASK } from "../../../constants";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task, TaskFromServer } from "../../../types/task";
import { WPQTModal } from "../WPQTModal";
import { TaskModalContent } from "./TaskModalContent";

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
