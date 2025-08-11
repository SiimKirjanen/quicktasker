import { useContext } from "@wordpress/element";
import { CLOSE_TASK_MODAL, PIPELINE_EDIT_TASK } from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { UploadContextProvider } from "../../../providers/UploadContextProvider";
import { Task, TaskFromServer } from "../../../types/task";
import { WPQTModal } from "../WPQTModal";
import { TaskModalContent } from "./TaskModalContent";

type Props = {
  editTaskCallback?: (task: TaskFromServer) => void;
  deleteTaskCallback?: (task: Task) => void;
};
function TaskModal({ deleteTaskCallback }: Props) {
  const {
    state: { taskModalOpen },
  } = useContext(ModalContext);
  const { deleteTask } = useTaskActions();
  const { closeModal, handleSuccess } = useModal(CLOSE_TASK_MODAL);

  const onEditTaskCompleted = (task: TaskFromServer) => {
    handleSuccess(PIPELINE_EDIT_TASK, task, DispatchType.ACTIVE_PIPELINE);
  };

  const onDeleteTask = async (task: Task) => {
    deleteTask(task.id, () => {
      if (deleteTaskCallback) {
        deleteTaskCallback(task);
      }
    });
  };

  return (
    <WPQTModal modalOpen={taskModalOpen} closeModal={closeModal} size="xl">
      <UploadContextProvider>
        <TaskModalContent
          deleteTask={onDeleteTask}
          onEditTaskCompleted={onEditTaskCompleted}
        />
      </UploadContextProvider>
    </WPQTModal>
  );
}

export { TaskModal };
