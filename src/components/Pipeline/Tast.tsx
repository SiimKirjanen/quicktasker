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
        >
          {item.name}
        </div>
      )}
    </Draggable>
  );
}
export { Task };
