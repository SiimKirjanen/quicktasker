import {
  ChatBubbleLeftIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useNavigate } from "react-router-dom";
import { WPQTIconButton } from "../../../../../components/common/Button/Button";
import { Task } from "../../../../../types/task";
import { User, WPUser } from "../../../../../types/user";
import { UPDATE_USER_PAGE_TASK_DATA } from "../../../../constants";
import { useTaskActions } from "../../../../hooks/actions/useTaskActions";
import { UserPageAppContext } from "../../../../providers/UserPageAppContextProvider";
import { UserPageTaskContext } from "../../../../providers/UserPageTaskContextProvider";

type Props = {
  task: Task | null;
};
function TaskControls({ task }: Props) {
  const {
    state: { userId, userType },
  } = useContext(UserPageAppContext);
  const { userTaskDispatch } = useContext(UserPageTaskContext);
  const { assignToTask, unAssignFromTask } = useTaskActions();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAssignedToTask =
    task?.assigned_users?.some(
      (user: User) => user.id === userId && user.user_type === userType,
    ) ||
    task?.assigned_wp_users?.some(
      (wpUser: WPUser) => wpUser.id === userId && wpUser.user_type === userType,
    );

  if (task === null) {
    return null;
  }

  const onAssignToTask = async () => {
    setLoading(true);
    await assignToTask(task.task_hash, (data) => {
      userTaskDispatch({ type: UPDATE_USER_PAGE_TASK_DATA, payload: data });
    });
    setLoading(false);
  };

  const onUnassignFromTask = async () => {
    setLoading(true);
    await unAssignFromTask(task.task_hash, () => {
      navigate(`/`);
    });
    setLoading(false);
  };

  return (
    <div className="wpqt-mt-5 wpqt-flex wpqt-flex-wrap wpqt-justify-center wpqt-gap-4">
      {isAssignedToTask && (
        <WPQTIconButton
          loading={loading}
          icon={<UserMinusIcon className="wpqt-icon-red wpqt-size-5" />}
          text={__("Unassign from task", "quicktasker")}
          onClick={onUnassignFromTask}
        />
      )}
      {isAssignedToTask && (
        <WPQTIconButton
          icon={<ChatBubbleLeftIcon className="wpqt-icon-blue wpqt-size-5" />}
          text={__("Manage task comments", "quicktasker")}
          onClick={() => {
            navigate(`/tasks/${task.task_hash}/comments`);
          }}
        />
      )}
      {!isAssignedToTask && (
        <WPQTIconButton
          loading={loading}
          icon={<UserPlusIcon className="wpqt-icon-green wpqt-size-5" />}
          text={__("Assing to task", "quicktasker")}
          onClick={onAssignToTask}
        />
      )}
    </div>
  );
}

export { TaskControls };
