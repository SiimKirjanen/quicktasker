import { ClockIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { TaskCardActions } from "../../../../components/Card/TaskCardActions/TaskCardActions";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { ArchivedTaskDropdown } from "../../../../components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";
import { TaskLabelDropdown } from "../../../../components/Dropdown/TaskLabelDropdown/TaskLabelDropdown";
import { UserAssignementDropdown } from "../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import {
  ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
  CHANGE_ARCHIVED_TASK_DONE_STATUS,
  OPEN_EDIT_TASK_MODAL,
  REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
} from "../../../../constants";
import { useTimezone } from "../../../../hooks/useTimezone";
import { ArchiveContext } from "../../../../providers/ArchiveContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Task } from "../../../../types/task";
import { User, WPUser } from "../../../../types/user";

type Props = {
  task: Task;
};
function ArchiveItem({ task }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const { archiveDispatch } = useContext(ArchiveContext);
  const { convertToWPTimezone } = useTimezone();
  const dueDate = task.due_date ? convertToWPTimezone(task.due_date) : null;

  return (
    <WPQTCard
      title={task.name}
      description={task.description}
      dropdown={<ArchivedTaskDropdown task={task} />}
      className="wpqt-cursor-pointer"
      onClick={() => {
        modalDispatch({
          type: OPEN_EDIT_TASK_MODAL,
          payload: { taskToEdit: task },
        });
      }}
    >
      <WPQTCardDataItem
        label={__("Board", "quicktasker")}
        value={
          task.pipeline_name
            ? task.pipeline_name
            : __("Board is deleted!", "quicktasker")
        }
        icon={<ViewColumnsIcon className="wpqt-size-5 wpqt-icon-blue" />}
      />

      <div className="wpqt-mt-2 wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-items-start">
        <UserAssignementDropdown
          menuBtnClasses="wpqt-self-start"
          task={task}
          onUserAdd={(user: User | WPUser) => {
            archiveDispatch({
              type: ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
              payload: { taskId: task.id, user },
            });
          }}
          onUserDelete={(user: User | WPUser) => {
            archiveDispatch({
              type: REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
              payload: { taskId: task.id, user },
            });
          }}
        />
        <TaskLabelDropdown task={task} />
      </div>

      {dueDate && (
        <WPQTCardDataItem
          label={__("Due date", "quicktasker")}
          value={dueDate}
          icon={<ClockIcon className="wpqt-size-5 wpqt-icon-blue" />}
        />
      )}

      <TaskCardActions
        task={task}
        onDoneStatusChange={(taskId: string, done: boolean) => {
          archiveDispatch({
            type: CHANGE_ARCHIVED_TASK_DONE_STATUS,
            payload: { taskId, done },
          });
        }}
      />
    </WPQTCard>
  );
}

export { ArchiveItem };
