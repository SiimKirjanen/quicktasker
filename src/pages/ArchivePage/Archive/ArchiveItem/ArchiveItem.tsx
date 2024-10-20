import { useContext } from "@wordpress/element";
import { WPQTCard } from "../../../../components/Card/Card";
import { TaskCardActions } from "../../../../components/Card/TaskCardActions";
import { ArchivedTaskDropdown } from "../../../../components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";
import { UserAssignementDropdown } from "../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import {
  ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
  CHANGE_ARCHIVED_TASK_DONE_STATUS,
  OPEN_EDIT_TASK_MODAL,
  REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
} from "../../../../constants";
import { ArchiveContext } from "../../../../providers/ArchiveContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Task } from "../../../../types/task";
import { User } from "../../../../types/user";

type Props = {
  task: Task;
};
function ArchiveItem({ task }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const { archiveDispatch } = useContext(ArchiveContext);

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
      <UserAssignementDropdown
        task={task}
        onUserAdd={(user: User) => {
          archiveDispatch({
            type: ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
            payload: { taskId: task.id, user },
          });
        }}
        onUserDelete={(user: User) => {
          archiveDispatch({
            type: REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
            payload: { taskId: task.id, user },
          });
        }}
      />

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
