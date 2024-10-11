import { useContext } from "@wordpress/element";
import { WPQTCard } from "../../components/Card/Card";
import { UserTaskDropdown } from "../../components/Dropdown/UserTaskDropdown/UserTaskDropdown";
import { TaskModal } from "../../components/Modal/TaskModal/TaskModal";
import {
  EDIT_USER_TASK,
  OPEN_EDIT_TASK_MODAL,
  REMOVE_USER_TASK,
} from "../../constants";
import { useTaskActions } from "../../hooks/actions/useTaskActions";
import { useUserTasksFilter } from "../../hooks/filters/useUserTasksFilter";
import { ModalContext } from "../../providers/ModalContextProvider";
import { UserTasksContext } from "../../providers/UserTasksContextProvider";
import { Task, TaskFromServer } from "../../types/task";

type Props = {
  userId: string;
};
function UserTasks({ userId }: Props) {
  const { filterTasks } = useUserTasksFilter();
  const { modalDispatch } = useContext(ModalContext);
  const {
    state: { tasks },
    userTasksDispatch,
  } = useContext(UserTasksContext);
  const { removeTaskFromUser } = useTaskActions();

  const unAssignTask = async (taskId: string) => {
    removeTaskFromUser(userId, taskId, () => {
      userTasksDispatch({ type: REMOVE_USER_TASK, payload: taskId });
    });
  };

  const onEditTaskCallback = (task: TaskFromServer) => {
    userTasksDispatch({ type: EDIT_USER_TASK, payload: task });
  };

  return (
    <>
      <div className="wpqt-grid wpqt-grid-cols-4 wpqt-gap-2">
        {tasks.filter(filterTasks).map((task: Task) => {
          return (
            <WPQTCard
              className="wpqt-cursor-pointer"
              key={task.id}
              title={task.name}
              description={task.description}
              dropdown={
                <UserTaskDropdown
                  taskId={task.id}
                  onUnAssignTask={unAssignTask}
                />
              }
              onClick={() => {
                modalDispatch({
                  type: OPEN_EDIT_TASK_MODAL,
                  payload: { taskToEdit: task },
                });
              }}
            ></WPQTCard>
          );
        })}
      </div>
      <TaskModal editTaskCallback={onEditTaskCallback} />
    </>
  );
}

export { UserTasks };
