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
import { TbLogs } from "react-icons/tb";
import { toast } from "react-toastify";
import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  CLOSE_TASK_MODAL,
  OPEN_TASK_LOGS_MODAL,
  OPEN_TASK_RESTORE_MODAL,
  PIPELINE_CHANGE_TASK_DONE_STATUS,
  PIPELINE_EDIT_TASK,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { useLoadingStates } from "../../../hooks/useLoadingStates";
import { useTimezone } from "../../../hooks/useTimezone";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { AppContext } from "../../../providers/AppContextProvider";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { Label } from "../../../types/label";
import { UploadEntityType } from "../../../types/upload";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { AutoSaveInput } from "../../common/Input/AutoSaveInput/AutoSaveInput";
import { AutoSaveTextarea } from "../../common/Input/AutoSaveTextarea/AutoSaveTextarea";
import { CustomFieldsInModalWrap } from "../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap";
import { WPQTConfirmTooltip } from "../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { TaskLabelDropdown } from "../../Dropdown/TaskLabelDropdown/TaskLabelDropdown";
import { UserAssignementDropdown } from "../../Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import { LoadingOval } from "../../Loading/Loading";
import { WPQTTabs } from "../../Tab/WPQTTabs";
import { UploadManager } from "../../Upload/UploadManager/UploadManager";
import { FreeForAllToggle } from "./components/FreeForAllToggle/FreeForAllToggle";
import { TaskComments } from "./components/TaskComments/TaskComments";
import { TaskDueDateInput } from "./components/TaskDueDateInput/TaskDueDateInput";

type Props = {
  deleteTask: (task: Task) => Promise<void>;
};

const TaskModalContent = ({ deleteTask }: Props) => {
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
    dispatch: activePipelineDispatch,
  } = useContext(ActivePipelineContext);

  const onEditTaskCompleted = (task: TaskFromServer) => {
    activePipelineDispatch({ type: PIPELINE_EDIT_TASK, payload: task });
  };
  const [restoringTask] = useState(false);
  const [assignedTaskLabels, setAssignedTaskLabels] = useState<Label[]>([]);
  const { archiveTask, editTask } = useTaskActions();
  const {
    loading1: isDeletingTask,
    setLoading1: setIsDeletingTask,
    loading2: archiveLoading,
    setLoading2: setArchiveLoading,
  } = useLoadingStates();
  const { browserTimezoneAbbreviation } = useTimezone();

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
      <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 lg:wpqt-grid-cols-[1fr_auto]">
        <div className="wpqt-border-0 lg:wpqt-border-r lg:wpqt-border-solid lg:wpqt-border-r-gray-300 lg:wpqt-pr-6">
          <WPQTTabs
            tabs={[
              { name: __("Details", "quicktasker") },
              { name: __("Comments", "quicktasker") },
            ]}
            tabClassName="!wpqt-flex-none wpqt-px-4 wpqt-text-left wpqt-font-semibold wpqt-text-gray-400 hover:wpqt-text-gray-600 data-[selected]:wpqt-text-blue-600 data-[selected]:!wpqt-border-b-[3px]"
            tabsContent={[
              <div key="details">
                <div className="wpqt-mb-2 wpqt-grid wpqt-grid-cols-1 wpqt-gap-10 lg:wpqt-grid-cols-[1fr_0.7fr]">
                  <WPQTModalFieldSet>
                    <WPQTModalField label={__("Name", "quicktasker")}>
                      <AutoSaveInput
                        value={taskToEdit.name}
                        wrapperClassName="wpqt-w-full"
                        className="wpqt-w-full"
                        onChange={async (value) => {
                          const { success, task: updatedTask } = await editTask(
                            taskToEdit.id,
                            { name: value },
                          );
                          if (success && updatedTask) {
                            onEditTaskCompleted(updatedTask);
                            toast.success(
                              __("Task name updated", "quicktasker"),
                            );
                          }
                        }}
                      />
                    </WPQTModalField>

                    <WPQTModalField label={__("Description", "quicktasker")}>
                      <AutoSaveTextarea
                        value={taskToEdit.description}
                        className="wpqt-w-full"
                        onChange={async (value) => {
                          const { success, task: updatedTask } = await editTask(
                            taskToEdit.id,
                            { description: value },
                          );
                          if (success && updatedTask) {
                            onEditTaskCompleted(updatedTask);
                            toast.success(
                              __("Task description updated", "quicktasker"),
                            );
                          }
                        }}
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
                      description={__(
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

                    <WPQTModalField
                      label={
                        __("Due date", "quicktasker") +
                        ` (${browserTimezoneAbbreviation})`
                      }
                    >
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
              </div>,
              <div key="comments" className="lg:wpqt-pr-3">
                <TaskComments taskId={taskToEdit.id} />
              </div>,
            ]}
          />
        </div>

        <div className="wpqt-flex wpqt-flex-wrap wpqt-justify-end wpqt-gap-2 lg:wpqt-flex-col lg:wpqt-justify-start">
          <WPQTIconButton
            icon={<TbLogs className="wpqt-icon-blue wpqt-size-5" />}
            text={__("View logs", "quicktasker")}
            onClick={() => {
              modalDispatch({
                type: OPEN_TASK_LOGS_MODAL,
                payload: { taskId: taskToEdit.id },
              });
            }}
          />
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
                archiveTask(taskToEdit.id, taskToEdit.pipeline_id, () => {
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
