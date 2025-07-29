import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task, TaskFromServer } from "../../../types/task";
import { WPQTModalField, WPQTModalFieldSet } from "../WPQTModal";

import {
  ArchiveBoxIcon,
  ArrowUturnUpIcon,
  CheckBadgeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  CLOSE_TASK_MODAL,
  OPEN_TASK_RESTORE_MODAL,
  PIPELINE_CHANGE_TASK_DONE_STATUS,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { useLoadingStates } from "../../../hooks/useLoadingStates";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { AppContext } from "../../../providers/AppContextProvider";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { Label } from "../../../types/label";
import { UploadEntityType } from "../../../types/upload";
import { WPQTIconButton } from "../../common/Button/Button";
import { CustomFieldsInModalWrap } from "../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap";
import { WPQTConfirmTooltip } from "../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { TaskLabelDropdown } from "../../Dropdown/TaskLabelDropdown/TaskLabelDropdown";
import { UserAssignementDropdown } from "../../Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import { LoadingOval } from "../../Loading/Loading";
import { TaskModalTabs } from "../../Tab/CommentsAndLogs/TaskModalTabs/TaskModalTabs";
import { UploadManager } from "../../Upload/UploadManager/UploadManager";
import { FreeForAllToggle } from "./components/FreeForAllToggle/FreeForAllToggle";
import { TaskDescriptionInput } from "./components/TaskDescriptionInput/TaskDescriptionInput";
import { TaskDueDateInput } from "./components/TaskDueDateInput/TaskDueDateInput";
import { TaskNameInput } from "./components/TaskeNameInput/TaskNameInput";

type Props = {
  taskModalSaving: boolean;
  editTask: (task: Task) => void;
  deleteTask: (task: Task) => Promise<void>;
  onEditTaskCompleted: (task: TaskFromServer) => void;
};

const TaskModalContent = ({ deleteTask, onEditTaskCompleted }: Props) => {
  const {
    state: { taskToEdit, taskModalSettings },
    modalDispatch,
  } = useContext(ModalContext);
  const {
    state: { isUserAllowedToDelete },
  } = useContext(AppContext);
  const {
    state: { activePipeline },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const [restoringTask] = useState(false);
  const [assignedTaskLabels, setAssignedTaskLabels] = useState<Label[]>([]);
  const { archiveTask } = useTaskActions();
  const {
    loading1: isDeletingTask,
    setLoading1: setIsDeletingTask,
    loading2: archiveLoading,
    setLoading2: setArchiveLoading,
  } = useLoadingStates();

  const isTaskArchived = taskToEdit?.is_archived;

  useEffect(() => {
    if (taskToEdit) {
      setAssignedTaskLabels(taskToEdit.assigned_labels);
    }
  }, [taskToEdit]);

  const onLabelSelected = (label: Label) => {
    setAssignedTaskLabels((prev) => [...prev, label]);
  };

  const onLabelDeSelected = (labelId: string) => {
    setAssignedTaskLabels((prev) =>
      prev.filter((label) => label.id !== labelId),
    );
  };

  const onLabelDeleted = (labelId: string) => {
    setAssignedTaskLabels((prev) =>
      prev.filter((label) => label.id !== labelId),
    );
  };

  if (!taskToEdit) {
    return null;
  }

  return (
    <>
      <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]">
        <div className="wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-6">
          <div className="wpqt-mb-2 wpqt-grid wpqt-grid-cols-1 wpqt-gap-10 md:wpqt-grid-cols-[1fr_0.7fr]">
            <WPQTModalFieldSet>
              <WPQTModalField label={__("Name", "quicktasker")}>
                <TaskNameInput
                  task={taskToEdit}
                  onEditTaskCompleted={onEditTaskCompleted}
                />
              </WPQTModalField>

              <WPQTModalField label={__("Description", "quicktasker")}>
                <TaskDescriptionInput
                  task={taskToEdit}
                  onEditTaskCompleted={onEditTaskCompleted}
                />
              </WPQTModalField>

              <WPQTModalField label={__("Assigned users", "quicktasker")}>
                <UserAssignementDropdown
                  task={taskToEdit}
                  onUserAdd={(user) => {
                    modalDispatch({
                      type: ADD_ASSIGNED_USER_TO_EDITING_TASK,
                      payload: user,
                    });
                  }}
                  onUserDelete={(user) => {
                    modalDispatch({
                      type: REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
                      payload: user,
                    });
                  }}
                />
              </WPQTModalField>

              <WPQTModalField label={__("Labels", "quicktasker")}>
                <TaskLabelDropdown
                  task={{
                    ...taskToEdit,
                    assigned_labels: assignedTaskLabels,
                  }}
                  labelSelected={onLabelSelected}
                  labelDeselected={onLabelDeSelected}
                  labelDeleted={onLabelDeleted}
                />
              </WPQTModalField>

              <WPQTModalField
                label={__("Free for all task", "quicktasker")}
                tooltipId={`free-for-all-${taskToEdit.id}-tooltip`}
                tooltipText={__(
                  "When enabled, users have the ability to self-assign or unassign this task.",
                  "quicktasker",
                )}
              >
                <FreeForAllToggle
                  task={taskToEdit}
                  initialValue={taskToEdit.free_for_all}
                  onEditTaskCompleted={onEditTaskCompleted}
                />
              </WPQTModalField>

              <WPQTModalField label={__("Due date", "quicktasker")}>
                <TaskDueDateInput
                  initialValue={taskToEdit.due_date || ""}
                  task={taskToEdit}
                  onEditTaskCompleted={onEditTaskCompleted}
                />
              </WPQTModalField>

              {taskModalSettings.allowToMarkTaskAsDone && (
                <TaskDoneStatus
                  taskId={taskToEdit.id}
                  isCompleted={taskToEdit.is_done}
                />
              )}
            </WPQTModalFieldSet>
            <div>
              <CustomFieldsInModalWrap
                entityId={taskToEdit.id}
                entityType={CustomFieldEntityType.Task}
              />
            </div>
          </div>

          <WPQTModalField label={__("File attachment", "quicktasker")}>
            <UploadManager
              entityId={taskToEdit.id}
              entityType={UploadEntityType.TASK}
            />
          </WPQTModalField>

          <div className="wpqt-mt-7 md:wpqt-pr-3">
            <TaskModalTabs task={taskToEdit} />
          </div>
        </div>

        <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
          {isTaskArchived && (
            <WPQTIconButton
              icon={
                <ArrowUturnUpIcon className="wpqt-icon-green wpqt-size-5" />
              }
              text={__("Restore task", "quicktasker")}
              loading={restoringTask}
              onClick={async () => {
                modalDispatch({ type: CLOSE_TASK_MODAL });
                modalDispatch({
                  type: OPEN_TASK_RESTORE_MODAL,
                  payload: {
                    taskToRestore: taskToEdit,
                  },
                });
              }}
            />
          )}
          {!isTaskArchived && (
            <WPQTConfirmTooltip
              confirmMessage={__(
                "Are you sure you want to archive this task?",
                "quicktasker",
              )}
              onConfirm={() => {
                setArchiveLoading(true);
                archiveTask(taskToEdit.id, () => {
                  modalDispatch({ type: CLOSE_TASK_MODAL });
                  fetchAndSetPipelineData(activePipeline!.id);
                  setArchiveLoading(false);
                });
              }}
            >
              {({ onClick }) => (
                <WPQTIconButton
                  icon={
                    <ArchiveBoxIcon className="wpqt-icon-blue wpqt-size-5" />
                  }
                  text={__("Archive task", "quicktasker")}
                  loading={archiveLoading}
                  onClick={onClick}
                />
              )}
            </WPQTConfirmTooltip>
          )}

          {isUserAllowedToDelete && (
            <WPQTConfirmTooltip
              onConfirm={async () => {
                setIsDeletingTask(true);
                await deleteTask(taskToEdit);
                modalDispatch({ type: CLOSE_TASK_MODAL });
                setIsDeletingTask(false);
              }}
            >
              {({ onClick }) => (
                <WPQTIconButton
                  icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
                  text={__("Delete task", "quicktasker")}
                  loading={isDeletingTask}
                  onClick={onClick}
                />
              )}
            </WPQTConfirmTooltip>
          )}
        </div>
      </div>
    </>
  );
};

type TaskDontStatusProps = {
  taskId: string;
  isCompleted: boolean;
};
function TaskDoneStatus({ isCompleted, taskId }: TaskDontStatusProps) {
  const { modalDispatch } = useContext(ModalContext);
  const { dispatch } = useContext(ActivePipelineContext);
  const [isLoading, setIsLoading] = useState(false);
  const { changeTaskDoneStatus } = useTaskActions();

  const toggleTaskDontStatus = async () => {
    setIsLoading(true);
    await changeTaskDoneStatus(taskId, !isCompleted, (isCompleted) => {
      modalDispatch({
        type: PIPELINE_CHANGE_TASK_DONE_STATUS,
        payload: { done: isCompleted },
      });
      dispatch({
        type: PIPELINE_CHANGE_TASK_DONE_STATUS,
        payload: { taskId, done: isCompleted },
      });
    });
    setIsLoading(false);
  };
  return (
    <WPQTModalField
      label={
        isCompleted
          ? __("Task completed", "quicktasker")
          : __("Task not completed", "quicktasker")
      }
    >
      {isLoading ? (
        <LoadingOval width="24" height="24" />
      ) : (
        <CheckBadgeIcon
          onClick={toggleTaskDontStatus}
          className={`wpqt-size-6 ${isCompleted ? "wpqt-icon-green" : "wpqt-text-gray-300"} wpqt-cursor-pointer`}
        />
      )}
    </WPQTModalField>
  );
}

export { TaskModalContent };
