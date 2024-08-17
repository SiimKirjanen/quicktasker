import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Tast";
import { Task } from "../../types/task";
import { AddTask } from "./AddTask";
import { StageControls } from "./StageControls";

type Props = {
  stageId: string;
  stageName: string;
  stageTasks: Task[];
  stageDescription?: string;
};

function Stage({ stageId, stageTasks, stageName, stageDescription }: Props) {
  return (
    <Droppable droppableId={stageId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`wpqt-relative wpqt-mb-3 wpqt-flex wpqt-max-h-full wpqt-w-[320px] wpqt-flex-none wpqt-flex-col wpqt-overflow-hidden wpqt-rounded-md wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-gray-100`}
        >
          <div className="wpqt-mb-4 wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-1 wpqt-px-3 wpqt-pt-3">
            <div className="wpqt-mr-auto wpqt-text-base wpqt-leading-none">
              {stageName}
            </div>
            <StageControls stageId={stageId} />
            {stageDescription && (
              <div className="wpqt-w-full wpqt-flex-shrink-0 wpqt-flex-grow-0 wpqt-text-sm">
                {stageDescription}
              </div>
            )}
          </div>

          <div className="wpqt-flex wpqt-h-full wpqt-flex-col wpqt-overflow-y-auto">
            {stageTasks.map((task: Task, index: number) => (
              <TaskComponent task={task} index={index} />
            ))}
            {provided.placeholder}
            <AddTask stageId={stageId} />
          </div>
        </div>
      )}
    </Droppable>
  );
}

export { Stage };
