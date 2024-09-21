import { useEffect, useState } from "@wordpress/element";
import { WPQTPageHeader } from "../components/common/Header/Header";
import { Task } from "../types/task";
import { Page } from "./Page/Page";
import { FullLoading } from "../components/Loading/Loading";
import { toast } from "react-toastify";
import { getUserTasksRequest, removeTaskFromUserRequest } from "../api/api";
import { convertTaskFromServer } from "../utils/task";
import { WPQTCard } from "../components/Card/Card";
import { UserTasksFilter } from "../components/Filters/UserTasksFilter/UserTasksFilter";
import { useUserTasksFilter } from "../hooks/useUserTasksFilter";
import { UserTaskDropdown } from "../components/Dropdown/UserTaskDropdown/UserTaskDropdown";

type Props = {
  userId: string;
};

function UserTasksPage({ userId }: Props) {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { filterTasks } = useUserTasksFilter(searchValue);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      const response = await getUserTasksRequest(userId);
      setUserTasks(response.data.map(convertTaskFromServer));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user tasks. Please try again");
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <FullLoading />;
  }
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
              key={task.id}
              title={task.name}
              description={task.description}
              dropdown={
                <UserTaskDropdown
                  taskId={task.id}
                  onUnAssignTask={unAssignTask}
                />
              }
            ></WPQTCard>
          );
        })}
      </div>
    </Page>
  );
}

export { UserTasksPage };
