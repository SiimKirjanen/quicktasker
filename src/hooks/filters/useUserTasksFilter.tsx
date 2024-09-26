import { useContext } from "@wordpress/element";
import { Task } from "../../types/task";
import { UserTasksContext } from "../../providers/UserTasksContextProvider";

const useUserTasksFilter = () => {
  const {
    state: { searchValue },
  } = useContext(UserTasksContext);

  const filterTasks = (task: Task) => {
    const matchesSearchValue =
      (task.name &&
        task.name.toLowerCase().includes(searchValue.toLowerCase())) ||
      (task.description &&
        task.description.toLowerCase().includes(searchValue.toLowerCase()));

    return matchesSearchValue;
  };

  return {
    filterTasks,
  };
};

export { useUserTasksFilter };
