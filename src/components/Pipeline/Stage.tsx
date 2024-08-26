import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Task/Task";
import { Task } from "../../types/task";
import { AddTask } from "./AddTask";
import { StageControlsDropdown } from "../Dropdown/StageControlsDropdown/StageControlsDropdown";
import { Stage } from "../../types/stage";

type Props = {
  stage: Stage;
};

function TaskCount({ tasks }: { tasks: Task[] | undefined }) {
  const taskCount = tasks!.length;

  return (
    <span className="wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-1 wpqt-text-xs">
      {taskCount}
    </span>
  );
}

function Stage({ stage }: Props) {
  return (
    <Droppable droppableId={stage.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          data-stage-id={stage.id}
          className={`wpqt-relative wpqt-mb-3 wpqt-flex wpqt-max-h-full wpqt-w-[320px] wpqt-flex-none wpqt-flex-col wpqt-overflow-hidden wpqt-rounded-md wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-gray-100`}
        >
          <div className="wpqt-mb-4 wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-1 wpqt-px-3 wpqt-pt-3">
            <div className="wpqt-mr-auto wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-text-base wpqt-leading-none">
              {stage.name} <TaskCount tasks={stage.tasks} />
            </div>
            <StageControlsDropdown stage={stage} />
            {stage.description && (
              <div className="wpqt-w-full wpqt-flex-shrink-0 wpqt-flex-grow-0 wpqt-text-sm">
                {stage.description}
              </div>
            )}
          </div>

          <div className="wpqt-flex wpqt-h-full wpqt-flex-col wpqt-overflow-y-auto wpqt-overflow-x-hidden">
            {stage.tasks?.map((task: Task, index: number) => (
              <TaskComponent task={task} index={index} />
            ))}
            {provided.placeholder}
            <AddTask stageId={stage.id} />
          </div>
        </div>
      )}
    </Droppable>
  );
}

export { Stage };
