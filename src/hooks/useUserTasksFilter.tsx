import { Task } from "../types/task";

const useUserTasksFilter = (searchValue: string) => {
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
