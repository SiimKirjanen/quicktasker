import { Droppable } from "@hello-pangea/dnd";
import { Task as TaskComponent } from "./Tast";
import { Task } from "../../types/task";

type Props = {
  droppableId: string;
  tasks: Task[];
};

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

function Stage({ droppableId, tasks }: Props) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {tasks.map((item: any, index: number) => (
            <TaskComponent item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export { Stage };
