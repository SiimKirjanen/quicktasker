import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Tast";
import { Task } from "../../types/task";
import { AddTask } from "./AddTask";

type Props = {
  droppableId: string;
  tasks: Task[];
};

function Stage({ droppableId, tasks }: Props) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`wpqt-flex wpqt-flex-col wpqt-w-[280px] wpqt-max-h-full wpqt-relative wpqt-p-2 wpqt-overflow-hidden wpqt-bg-gray-100 wpqt-rounded-md ${
            snapshot.isDraggingOver ? "wpqt-bg-blue-400" : ""
          }`}
        >
          <div className="wpqt-flex wpqt-flex-col wpqt-gap-[8px] wpqt-pb-[12px]">
            {tasks.map((item: any, index: number) => (
              <TaskComponent item={item} index={index} />
            ))}
          </div>
          <AddTask stageId={droppableId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export { Stage };
