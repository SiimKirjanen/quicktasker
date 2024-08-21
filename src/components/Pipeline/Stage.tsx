import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Task";
import { Task } from "../../types/task";
import { AddTask } from "./AddTask";
import { StageControls } from "./StageControls";
import { Stage } from "../../types/stage";

type Props = {
  stage: Stage;
};

function Stage({ stage }: Props) {
  return (
    <Droppable droppableId={stage.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`wpqt-relative wpqt-mb-3 wpqt-flex wpqt-max-h-full wpqt-w-[320px] wpqt-flex-none wpqt-flex-col wpqt-overflow-hidden wpqt-rounded-md wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-gray-100`}
        >
          <div className="wpqt-mb-4 wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-1 wpqt-px-3 wpqt-pt-3">
            <div className="wpqt-mr-auto wpqt-text-base wpqt-leading-none">
              {stage.name}
            </div>
            <StageControls stage={stage} />
            {stage.description && (
              <div className="wpqt-w-full wpqt-flex-shrink-0 wpqt-flex-grow-0 wpqt-text-sm">
                {stage.description}
              </div>
            )}
          </div>

          <div className="wpqt-flex wpqt-h-full wpqt-flex-col wpqt-overflow-y-auto wpqt-overflow-x-hidden">
            {stage.tasks.map((task: Task, index: number) => (
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
