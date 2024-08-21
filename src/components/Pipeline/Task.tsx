import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../types/task";
import { useContext } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import { OPEN_EDIT_TASK_MODAL } from "../../constants";

type Props = {
  task: Task;
  index: number;
};

function Task({ task, index }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  const openEditTaskModal = () => {
    console.log(task);
    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
      },
    });
  };
  console.log(task);

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="wpqt-mx-3 wpqt-mb-2 !wpqt-cursor-pointer wpqt-rounded wpqt-border wpqt-border-gray-200 wpqt-bg-white wpqt-p-3 wpqt-shadow"
          onClick={openEditTaskModal}
        >
          <div className="wpqt-text-base">{task.name}</div>
          {task.description && (
            <div className="wpqt-text-sm">{task.description}</div>
          )}
        </div>
      )}
    </Draggable>
  );
}
export { Task };
