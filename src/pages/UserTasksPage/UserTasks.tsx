import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../components/Card/Card";
import { UserTaskDropdown } from "../../components/Dropdown/UserTaskDropdown/UserTaskDropdown";
import { NoFilterResults } from "../../components/Filter/NoFilterResults/NoFilterResults";
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
  const filteredTasks = tasks?.filter(filterTasks) ?? [];

  const unAssignTask = async (taskId: string) => {
    removeTaskFromUser(userId, taskId, () => {
      userTasksDispatch({ type: REMOVE_USER_TASK, payload: taskId });
    });
  };

  const onEditTaskCallback = (task: TaskFromServer) => {
    userTasksDispatch({ type: EDIT_USER_TASK, payload: task });
  };

  if (tasks && tasks.length === 0) {
    return <NoFilterResults text={__("User has no tasks", "quicktasker")} />;
  }

  if (filteredTasks && filteredTasks.length === 0) {
    return <NoFilterResults />;
  }

  return (
    <>
      <div className="wpqt-grid wpqt-grid-cols-4 wpqt-gap-2">
        {filteredTasks.map((task: Task) => {
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
