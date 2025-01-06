import { Draggable } from "@hello-pangea/dnd";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TaskControlsDropdown } from "../../../../components/Dropdown/TaskControlsDropdown/TaskControlsDropdown";
import { TaskLabelDropdown } from "../../../../components/Dropdown/TaskLabelDropdown/TaskLabelDropdown";
import { UserAssignementDropdown } from "../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import { OPEN_EDIT_TASK_MODAL } from "../../../../constants";
import { useTimezone } from "../../../../hooks/useTimezone";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Task } from "../../../../types/task";
import { TaskActions } from "./TaskActions";

type Props = {
  task: Task;
  index: number;
  onLastStage: boolean;
};

function Task({ task, index, onLastStage }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const {
    state: { activePipeline },
  } = useContext(ActivePipelineContext);
  const { convertToWPTimezone } = useTimezone();
  const pipelineSettings = activePipeline?.settings;
  const allowToMarkTaskAsDone =
    !pipelineSettings!.allow_only_last_stage_task_done || onLastStage;

  const openEditTaskModal = () => {
    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
        taskModalSettings: {
          allowToMarkTaskAsDone,
        },
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
          className="wpqt-relative wpqt-mx-4 wpqt-mb-2 wpqt-flex !wpqt-cursor-pointer wpqt-flex-col wpqt-gap-1 wpqt-rounded wpqt-border wpqt-border-gray-200 wpqt-bg-white wpqt-p-3 wpqt-shadow hover:wpqt-shadow-md"
          onClick={openEditTaskModal}
        >
          <div className="wpqt-absolute wpqt-right-[12px] wpqt-top-[12px]">
            <TaskControlsDropdown task={task} />
          </div>

          <div className="wpqt-text-base">{task.name}</div>

          {task.description && (
            <div className="wpqt-text-sm wpqt-italic">{task.description}</div>
          )}

          <div className="wpqt-mt-2 wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-items-start">
            <UserAssignementDropdown task={task} />
            <TaskLabelDropdown task={task} />
          </div>
          {task.due_date && (
            <div className="wpqt-mb-2 wpqt-flex wpqt-gap-2 wpqt-items-center">
              <ClockIcon className="wpqt-size-5 wpqt-icon-blue" />
              <span className="wpqt-font-semibold">
                {__("Due date", "quicktasker")}:
              </span>
              {convertToWPTimezone(task.due_date)}
            </div>
          )}
          <TaskActions
            task={task}
            allowToMarkTaskAsDone={allowToMarkTaskAsDone}
          />
        </div>
      )}
    </Draggable>
  );
}

export { Task };
