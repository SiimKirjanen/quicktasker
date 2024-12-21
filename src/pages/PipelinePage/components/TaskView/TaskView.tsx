import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { TaskControlsDropdown } from "../../../../components/Dropdown/TaskControlsDropdown/TaskControlsDropdown";
import { UserAssignementDropdown } from "../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import { NoFilterResults } from "../../../../components/Filter/NoFilterResults/NoFilterResults";
import { TaskModal } from "../../../../components/Modal/TaskModal/TaskModal";
import { OPEN_EDIT_TASK_MODAL } from "../../../../constants";
import { useTaskFilter } from "../../../../hooks/filters/useTaskFilter";
import { useActivePipeline } from "../../../../hooks/useActivePipeline";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { TaskActions } from "../Task/TaskActions";

function TaskView() {
  const { modalDispatch } = useContext(ModalContext);
  const { activePipelineTasks, activePipelineSettings, isTaskOnLastStage } =
    useActivePipeline();
  const { taskViewFilter } = useTaskFilter();
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
        return (
          <WPQTCard
            className="wpqt-cursor-pointer"
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
            <div className="wpqt-mt-2">
              <UserAssignementDropdown task={task} />
            </div>
            <TaskActions
              task={task}
              allowToMarkTaskAsDone={allowToMarkTaskAsDone}
            />
          </WPQTCard>
        );
      })}
      <TaskModal />
    </div>
  );
}

export { TaskView };
