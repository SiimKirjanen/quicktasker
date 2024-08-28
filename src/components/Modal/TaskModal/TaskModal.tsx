import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import {
  CLOSE_TASK_MODAL,
  PIPELINE_ADD_TASK,
  PIPELINE_EDIT_TASK,
} from "../../../constants";
import { createTaskRequest, editTaskRequest } from "../../../api/api";
import { TaskModalContent } from "./TaskModalContent";
import { WPQTModal } from "../WPQTModal";
import { useModal } from "../useModal";
import { Task } from "../../../types/task";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";

function TaskModal() {
  const {
    state: { taskModalOpen, targetStageId },
  } = useContext(ModalContext);
  const {
    state: { activePipeline },
  } = useContext(ActivePipelineContext);

  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError,
  } = useModal(CLOSE_TASK_MODAL);

  const addTask = async (taskName: string, taskDescription: string) => {
    try {
      setModalSaving(true);
      const response = await createTaskRequest(
        targetStageId,
        activePipeline!.id,
        taskName,
        taskDescription,
      );
      handleSuccess(PIPELINE_ADD_TASK, response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const editTask = async (task: Task) => {
    try {
      setModalSaving(true);
      const response = await editTaskRequest(task);

      handleSuccess(PIPELINE_EDIT_TASK, response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={taskModalOpen} closeModal={closeModal}>
      <TaskModalContent
        ref={modalContentRef}
        addTask={addTask}
        editTask={editTask}
        taskModalSaving={modalSaving}
      />
    </WPQTModal>
  );
}

export { TaskModal };
