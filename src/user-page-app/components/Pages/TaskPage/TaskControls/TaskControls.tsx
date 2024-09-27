import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { WPQTIconButton } from "../../../../../components/common/Button/Button";
import { useContext } from "@wordpress/element";
import { UserPageAppContext } from "../../../../providers/UserPageAppContextProvider";
import { Task } from "../../../../../types/task";
import { User } from "../../../../../types/user";
import { useTaskActions } from "../../../../hooks/actions/useTaskActions";
import { useNavigate } from "react-router-dom";

type Props = {
  task: Task | null;
};
function TaskControls({ task }: Props) {
  const {
    state: { pageHash, userId },
  } = useContext(UserPageAppContext);
  const { assignToTask, unAssignFromTask } = useTaskActions();
  const navigate = useNavigate();

  const isAssignedToTask = task?.assigned_users.some(
    (user: User) => user.id === userId,
  );

  if (task === null) {
    return null;
  }

  const onAssignToTask = async () => {
    await assignToTask(pageHash, task.task_hash, () => {});
  };

  const onUnassignFromTask = async () => {
    await unAssignFromTask(pageHash, task.task_hash, () => {
      navigate(`/`);
    });
  };

  return (
    <div className="wpqt-mt-5 wpqt-flex wpqt-gap-2">
      {isAssignedToTask && (
        <WPQTIconButton
          icon={<UserMinusIcon className="wpqt-icon-red wpqt-size-5" />}
          text="Unassign from task"
          onClick={onUnassignFromTask}
        />
      )}
      {!isAssignedToTask && (
        <WPQTIconButton
          icon={<UserPlusIcon className="wpqt-icon-green wpqt-size-5" />}
          text="Assing to task"
          onClick={onAssignToTask}
        />
      )}
    </div>
  );
}

export { TaskControls };
