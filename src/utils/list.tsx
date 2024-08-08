import { Stage } from "../types/stage";
import { Task } from "../types/task";

/**
 * Moves a task from one stage to another within a list of stages.
 *
 * @param stages - The list of stages.
 * @param droppableSource - The source stage and index of the task being moved.
 * @param droppableDestination - The destination stage and index where the task will be moved to.
 * @returns The updated list of stages after moving the task.
 */
const moveTask = (
  stages: Stage[],
  droppableSource: { index: number; droppableId: string },
  droppableDestination: { index: number; droppableId: string }
): Stage[] => {
  const stagesClone = [...stages];

  const sourceStage = stagesClone.find(
    (stage) => stage.id === droppableSource.droppableId
  );
  const destinationStage = stagesClone.find(
    (stage) => stage.id === droppableDestination.droppableId
  );
  if (sourceStage && destinationStage) {
    const [removed] = sourceStage.tasks.splice(droppableSource.index, 1);

    destinationStage.tasks.splice(droppableDestination.index, 0, removed);
  }

  return stagesClone;
};

/**
 * Reorders a list of tasks after a task has been moved.
 *
 * @param list - The list of tasks.
 * @param startIndex - The index of the task being moved.
 * @param endIndex - The index where the task will be moved to.
 * @returns The updated list of tasks after reordering.
 */
const reorderTask = (list: Task[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export { moveTask, reorderTask };
