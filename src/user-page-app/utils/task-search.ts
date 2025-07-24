import { Task } from "../../types/task";

function filterTasks(task: Task, taskSearchValue: string) {
  if (!taskSearchValue) {
    return true;
  }

  const searchValue = taskSearchValue.toLowerCase();
  const taskName = task.name.toLowerCase();
  const taskDescription = task.description?.toLowerCase() || "";
  const taskPipelineName = task.pipeline_name?.toLowerCase() || "";

  return (
    taskName.includes(searchValue) ||
    taskDescription.includes(searchValue) ||
    taskPipelineName.includes(searchValue)
  );
}

export { filterTasks };
