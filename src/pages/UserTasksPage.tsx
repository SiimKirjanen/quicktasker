import { useContext, useEffect, useState } from "@wordpress/element";
import { WPQTPageHeader } from "../components/common/Header/Header";
import { Task } from "../types/task";
import { Page } from "./Page/Page";
import { toast } from "react-toastify";
import { getUserTasksRequest, removeTaskFromUserRequest } from "../api/api";
import { convertTaskFromServer } from "../utils/task";
import { WPQTCard } from "../components/Card/Card";
import { UserTasksFilter } from "../components/Filters/UserTasksFilter/UserTasksFilter";
import { useUserTasksFilter } from "../hooks/filters/useUserTasksFilter";
import { UserTaskDropdown } from "../components/Dropdown/UserTaskDropdown/UserTaskDropdown";
import { LoadingContext } from "../providers/LoadingContextProvider";
import { OPEN_EDIT_TASK_MODAL, SET_FULL_PAGE_LOADING } from "../constants";
import { TaskModal } from "../components/Modal/TaskModal/TaskModal";
import { ModalContext } from "../providers/ModalContextProvider";

type Props = {
  userId: string;
};

function UserTasksPage({ userId }: Props) {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { filterTasks } = useUserTasksFilter(searchValue);
  const { loadingDispatch } = useContext(LoadingContext);
  const { modalDispatch } = useContext(ModalContext);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: true });
      const response = await getUserTasksRequest(userId);
      setUserTasks(response.data.map(convertTaskFromServer));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user tasks. Please try again");
    } finally {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: false });
    }
  };

  const unAssignTask = async (taskId: string) => {
    try {
      await removeTaskFromUserRequest(userId, taskId);
      setUserTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to unassign task. Please try again");
    }
  };

  return (
    <Page>
      <WPQTPageHeader description="Tasks assigned to user">
        User tasks
      </WPQTPageHeader>
      <UserTasksFilter value={searchValue} onValueChange={setSearchValue} />
      <div className="wpqt-grid wpqt-grid-cols-4 wpqt-gap-2">
        {userTasks.filter(filterTasks).map((task: Task) => {
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
      <TaskModal />
    </Page>
  );
}

export { UserTasksPage };
