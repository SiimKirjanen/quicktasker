import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Task } from "../../types/task";

type Props = {
  item: Task;
  index: number;
};

function Task({ item, index }: Props) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="wpqt-bg-white wpqt-border wpqt-border-gray-200 wpqt-rounded wpqt-p-3 wpqt-mb-2 wpqt-shadow !wpqt-cursor-pointer"
        >
          <div className="wpqt-text-sm">{item.name}</div>
        </div>
      )}
    </Draggable>
  );
}
export { Task };
