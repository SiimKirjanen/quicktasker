import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Loading } from "../../../../../components/Loading/Loading";
import { Task } from "../../../../../types/task";
import { UPDATE_USER_PAGE_TASK_DONE } from "../../../../constants";
import { useTaskActions } from "../../../../hooks/actions/useTaskActions";
import { UserPageTaskContext } from "../../../../providers/UserPageTaskContextProvider";

type Props = {
  task: Task;
};
function TaskDoneStatus({ task }: Props) {
  const { changeTaskDoneStatus } = useTaskActions();
  const [loading, setLoading] = useState(false);
  const { userTaskDispatch } = useContext(UserPageTaskContext);

  const isDone = task.is_done;
  const doneMessage = !isDone
    ? __("Mark task as not completed", "quicktasker")
    : __("Mark task as completed", "quicktasker");

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

  return (
    <div className="wpqt-mt-2 wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-2">
      <div className="wpqt-font-medium">{doneMessage}</div>
      {loading ? (
        <Loading ovalSize="36" />
      ) : isDone ? (
        <CheckBadgeIcon
          className="wpqt-size-9 wpqt-text-gray-300 wpqt-cursor-pointer"
          onClick={() => {
            handleDoneStatusChange(false);
          }}
        />
      ) : (
        <CheckBadgeIcon
          className="wpqt-size-9 wpqt-icon-green wpqt-cursor-pointer"
          onClick={() => {
            handleDoneStatusChange(true);
          }}
        />
      )}
    </div>
  );
}

export { TaskDoneStatus };
