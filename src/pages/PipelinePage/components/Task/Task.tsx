import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../../../types/task";
import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { OPEN_EDIT_TASK_MODAL } from "../../../../constants";
import { TaskControlsDropdown } from "../../../../components/Dropdown/TaskControlsDropdown/TaskControlsDropdown";
import { UserAssignementDropdown } from "../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown";

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
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="wpqt-relative wpqt-mx-3 wpqt-mb-2 wpqt-flex !wpqt-cursor-pointer wpqt-flex-col wpqt-gap-1 wpqt-rounded wpqt-border wpqt-border-gray-200 wpqt-bg-white wpqt-p-3 wpqt-shadow"
          onClick={openEditTaskModal}
        >
          <div className="wpqt-absolute wpqt-right-[12px] wpqt-top-[12px]">
            <TaskControlsDropdown task={task} />
          </div>

          <div className="wpqt-text-base">{task.name}</div>

          {task.description && (
            <div className="wpqt-text-sm wpqt-italic">{task.description}</div>
          )}

          <div className="wpqt-mt-2">
            <UserAssignementDropdown task={task} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
export { Task };
