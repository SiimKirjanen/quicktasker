import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../../types/task";
import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { OPEN_EDIT_TASK_MODAL } from "../../../constants";
import { TaskControlsDropdown } from "./TaskControlsDropdown";

type Props = {
  task: Task;
  index: number;
};

function Task({ task, index }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  const openEditTaskModal = () => {
    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
      },
    });
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="wpqt-relative wpqt-mx-3 wpqt-mb-2 wpqt-flex !wpqt-cursor-pointer wpqt-flex-wrap wpqt-rounded wpqt-border wpqt-border-gray-200 wpqt-bg-white wpqt-p-3 wpqt-shadow"
          onClick={openEditTaskModal}
        >
          <div className="wpqt-text-base">{task.name}</div>

          <div className="wpqt-absolute wpqt-right-[12px] wpqt-top-[12px]">
            <TaskControlsDropdown task={task} />
          </div>

          {task.description && (
            <div className="wpqt-w-full wpqt-flex-shrink-0 wpqt-flex-grow-0 wpqt-text-sm">
              {task.description}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
export { Task };
