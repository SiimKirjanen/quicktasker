import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Tast";
import { Task } from "../../types/task";
import { AddTask } from "./AddTask";
import { StageControls } from "./StageControls";

type Props = {
  stageId: string;
  stageName: string;
  stageTasks: Task[];
};

function Stage({ stageId, stageTasks, stageName }: Props) {
  return (
    <Droppable droppableId={stageId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`wpqt-flex wpqt-flex-col wpqt-w-[280px] wpqt-flex-none wpqt-max-h-full wpqt-relative wpqt-p-4 wpqt-overflow-hidden wpqt-bg-gray-100 wpqt-rounded-md ${
            snapshot.isDraggingOver ? "wpqt-bg-blue-400" : ""
          }`}
        >
          <div className="wpqt-flex wpqt-items-center wpqt-mb-4">
            <div className="wpqt-text-base wpqt-leading-none wpqt-mr-auto">
              {stageName}
            </div>
            <StageControls stageId={stageId} />
          </div>
          <div className="wpqt-flex wpqt-flex-col wpqt-pb-[12px] wpqt-overflow-y-auto wpqt-stage-tasks-height">
            {stageTasks.map((item: any, index: number) => (
              <TaskComponent item={item} index={index} />
            ))}
          </div>
          <AddTask stageId={stageId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export { Stage };
