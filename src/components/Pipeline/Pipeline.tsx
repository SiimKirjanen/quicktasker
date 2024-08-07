import { useState, useCallback, useEffect } from "@wordpress/element";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { move, reorder } from "../../utils/list";
import { Pipeline } from "../../types/pipeline";
import { getPipelineData } from "../../api/api";
import { Stage } from "./Stage";

// fake data generator
const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    name: `item ${k + offset}`,
  }));

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
    (async () => {
      const pipelineData = await getPipelineData("2");
      console.log(pipelineData);
    })();
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
        <Stage droppableId="droppable" items={items} />
        <Stage droppableId="droppable2" items={selected} />
      </DragDropContext>
    </div>
  );
};
export default Pipeline;
