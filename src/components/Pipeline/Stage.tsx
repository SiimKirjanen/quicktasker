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
          className={`wpqt-flex wpqt-flex-col wpqt-w-[320px] wpqt-flex-none wpqt-mb-3 wpqt-max-h-full wpqt-relative wpqt-overflow-hidden wpqt-bg-gray-100 wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-rounded-md`}
        >
          <div className="wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-1 wpqt-mb-4 wpqt-px-3 wpqt-pt-3">
            <div className="wpqt-text-base wpqt-leading-none wpqt-mr-auto">
              {stageName}
            </div>
            <StageControls stageId={stageId} />
            {stageDescription && (
              <div className="wpqt-text-sm wpqt-flex-grow-0 wpqt-flex-shrink-0 wpqt-w-full">
                {stageDescription}
              </div>
            )}
          </div>

          <div className="wpqt-flex wpqt-flex-col wpqt-overflow-y-auto wpqt-h-full">
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
