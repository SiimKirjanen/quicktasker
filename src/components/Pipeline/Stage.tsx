import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Tast";
import { Task } from "../../types/task";
import { AddTask } from "./AddTask";
import { deleteStageRequest } from "../../api/api";

type Props = {
  stageId: string;
  stageName: string;
  stageTasks: Task[];
};

function Stage({ stageId, stageTasks, stageName }: Props) {
  const deleteStage = async () => {
    try {
      await deleteStageRequest(stageId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Droppable droppableId={stageId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`wpqt-flex wpqt-flex-col wpqt-w-[280px] wpqt-flex-none wpqt-max-h-full wpqt-relative wpqt-p-2 wpqt-overflow-hidden wpqt-bg-gray-100 wpqt-rounded-md ${
            snapshot.isDraggingOver ? "wpqt-bg-blue-400" : ""
          }`}
        >
          <div className="wpqt-flex wpqt-mb-2">
            <span>{stageName}</span>
            <div className="wpqt-ml-auto" onClick={deleteStage}>
              del
            </div>
          </div>
          <div className="wpqt-flex wpqt-flex-col wpqt-gap-[8px] wpqt-pb-[12px]">
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
