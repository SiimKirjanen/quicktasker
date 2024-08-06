import { useState, useCallback, useEffect } from "@wordpress/element";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import apiFetch from "@wordpress/api-fetch";
import { move, reorder } from "../../utils/list";
import { Pipeline } from "../../types/pipeline";

// fake data generator
const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: React.CSSProperties | undefined
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...(draggableStyle as React.CSSProperties & {
    [key: string]: string | number;
  }),
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const Pipeline = () => {
  const [items, setItems] = useState(getItems(10));
  const [selected, setSelected] = useState(getItems(5, 10));

  // Maps droppable IDs to state variables
  const id2List: { [key: string]: string } = {
    droppable: "items",
    droppable2: "selected",
  };

  // Get list from id
  const getList = useCallback(
    (id: string): Pipeline[] => {
      return id2List[id] === "items" ? items : selected;
    },
    [items, selected]
  );

  useEffect(() => {
    apiFetch({ path: "/wpqt/v1/pipeline/2" }).then((posts: any) => {
      console.log(posts);
    });
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedItems = reorder(
          getList(source.droppableId),
          source.index,
          destination.index
        );

        if (source.droppableId === "droppable") {
          setItems(reorderedItems);
        } else {
          setSelected(reorderedItems);
        }
      } else {
        const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );

        setItems(result.droppable);
        setSelected(result.droppable2);
      }
    },
    [getList]
  );

  return (
    <div className="wpqt-flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {selected.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Pipeline;
