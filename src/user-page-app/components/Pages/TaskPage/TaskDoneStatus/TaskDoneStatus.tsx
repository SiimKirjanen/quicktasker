import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Loading } from "../../../../../components/Loading/Loading";
import { Task } from "../../../../../types/task";
import { UPDATE_USER_PAGE_TASK_DONE } from "../../../../constants";
import { useTaskActions } from "../../../../hooks/actions/useTaskActions";
import { UserPageAppContext } from "../../../../providers/UserPageAppContextProvider";
import { UserPageTaskContext } from "../../../../providers/UserPageTaskContextProvider";

type Props = {
  task: Task;
};
function TaskDoneStatus({ task }: Props) {
  const { changeTaskDoneStatus } = useTaskActions();
  const [loading, setLoading] = useState(false);
  const {
    state: { pipelineSettings, taskStages },
    userTaskDispatch,
  } = useContext(UserPageTaskContext);
  const {
    state: { userId, userType },
  } = useContext(UserPageAppContext);

  const isAssigned =
    task?.assigned_users.some(
      (user) => user.id === userId && user.user_type === userType,
    ) ||
    task?.assigned_wp_users.some(
      (user) => user.id === userId && user.user_type === userType,
    );
  const isDone = task.is_done;
  const doneMessage = isDone
    ? __("Task is completed", "quicktasker")
    : __("Task is incomplete", "quicktasker");
  const lastStage = taskStages.reduce((prev, current) => {
    return Number(prev.stage_order) > Number(current.stage_order)
      ? prev
      : current;
  });
  const taskIsOnLastStage = task.stage_id === lastStage.id;
  const allowToMarkTaskAsDone =
    !pipelineSettings.allow_only_last_stage_task_done || taskIsOnLastStage;

  const handleDoneStatusChange = async (done: boolean) => {
    setLoading(true);
    await changeTaskDoneStatus(task.task_hash, done, () => {
      userTaskDispatch({
        type: UPDATE_USER_PAGE_TASK_DONE,
        payload: { done },
      });
    });
    setLoading(false);
  };

  if (!isAssigned) {
    return null;
  }

  if (!allowToMarkTaskAsDone) {
    return null;
  }

  return (
    <div className="wpqt-mt-2 wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center">
      <div className="wpqt-font-medium">{doneMessage}</div>
      <div className="wpqt-text-gray-400 wpqt-text-sm wpqt-mb-2">
        {__("Click to change", "quicktasker")}
      </div>
      {loading ? (
        <Loading ovalSize="36" />
      ) : isDone ? (
        <CheckBadgeIcon
          className={"wpqt-size-9 wpqt-icon-green wpqt-cursor-pointer"}
          onClick={() => {
            handleDoneStatusChange(false);
          }}
        />
      ) : (
        <CheckBadgeIcon
          className={"wpqt-size-9 wpqt-text-gray-300 wpqt-cursor-pointer"}
          onClick={() => {
            handleDoneStatusChange(true);
          }}
        />
      )}
    </div>
  );
}

export { TaskDoneStatus };
