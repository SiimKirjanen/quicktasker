import { useContext } from "@wordpress/element";
import { CLOSE_TASK_MODAL } from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
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
    modalDispatch,
  } = useContext(ModalContext);
  const { deleteTask } = useTaskActions();
  const closeModal = () => modalDispatch({ type: CLOSE_TASK_MODAL });

  const onDeleteTask = async (task: Task) => {
    deleteTask(task.id, () => {
      if (deleteTaskCallback) {
        deleteTaskCallback(task);
      }
    });
  };

  return (
    <WPQTModal
      modalOpen={taskModalOpen}
      closeModal={closeModal}
      size="xl"
      testId="task-modal"
    >
      <UploadContextProvider>
        <TaskModalContent deleteTask={onDeleteTask} />
      </UploadContextProvider>
    </WPQTModal>
  );
}

export { TaskModal };
