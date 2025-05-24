import { ClockIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { TaskControlsDropdown } from "../../../../components/Dropdown/TaskControlsDropdown/TaskControlsDropdown";
import { TaskLabelDropdown } from "../../../../components/Dropdown/TaskLabelDropdown/TaskLabelDropdown";
import { UserAssignementDropdown } from "../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import { NoFilterResults } from "../../../../components/Filter/NoFilterResults/NoFilterResults";
import { TaskColorModal } from "../../../../components/Modal/TaskColorModal/TaskColorModal";
import { TaskModal } from "../../../../components/Modal/TaskModal/TaskModal";
import {
  OPEN_EDIT_TASK_MODAL,
  TASK_FOCUS_BORDER_STYLE,
  TASK_FOCUS_BORDER_WIDTH,
} from "../../../../constants";
import { useTaskFilter } from "../../../../hooks/filters/useTaskFilter";
import { useActivePipeline } from "../../../../hooks/useActivePipeline";
import { useTimezone } from "../../../../hooks/useTimezone";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { TaskActions } from "../Task/TaskActions";

function TaskView() {
  const { modalDispatch } = useContext(ModalContext);
  const { activePipelineTasks, activePipelineSettings, isTaskOnLastStage } =
    useActivePipeline();
  const { taskViewFilter } = useTaskFilter();
  const { convertToWPTimezone } = useTimezone();
  const filteredTasks = activePipelineTasks.filter(taskViewFilter);

  if (filteredTasks.length === 0) {
    return <NoFilterResults text={__("No tasks", "quictasker")} />;
  }

  return (
    <div className="wpqt-card-grid">
      {filteredTasks.map((task) => {
        const onLastStage = isTaskOnLastStage(task.id);
        const allowToMarkTaskAsDone =
          !activePipelineSettings!.allow_only_last_stage_task_done ||
          onLastStage;
        const taskBorderStyle: React.CSSProperties = task.task_focus_color
          ? {
              borderTopColor: task.task_focus_color,
              borderTopWidth: TASK_FOCUS_BORDER_WIDTH,
              borderTopStyle: TASK_FOCUS_BORDER_STYLE,
            }
          : {};
        return (
          <WPQTCard
            className="wpqt-cursor-pointer"
            style={taskBorderStyle}
            key={task.id}
            title={task.name}
            description={task.description}
            dropdown={<TaskControlsDropdown task={task} />}
            onClick={() => {
              modalDispatch({
                type: OPEN_EDIT_TASK_MODAL,
                payload: {
                  taskToEdit: task,
                  taskModalSettings: {
                    allowToMarkTaskAsDone,
                  },
                },
              });
            }}
          >
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
          </WPQTCard>
        );
      })}
      <TaskModal />
      <TaskColorModal />
    </div>
  );
}

export { TaskView };
