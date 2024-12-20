import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { Loading } from "../../../../components/Loading/Loading";
import { PIPELINE_CHANGE_TASK_DONE_STATUS } from "../../../../constants";
import { useTaskActions } from "../../../../hooks/actions/useTaskActions";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import { Task } from "./Task";

type TaskActionsProps = {
  task: Task;
  allowToMarkTaskAsDone: boolean;
};
function TaskActions({ task, allowToMarkTaskAsDone }: TaskActionsProps) {
  const { dispatch } = useContext(ActivePipelineContext);
  const { changeTaskDoneStatus } = useTaskActions();
  const [loading, setLoading] = useState(false);
  const isTaskCompleted = task.is_done;
  const changeDone = async (done: boolean) => {
    setLoading(true);
    await changeTaskDoneStatus(task.id, done, (isCompleted) => {
      dispatch({
        type: PIPELINE_CHANGE_TASK_DONE_STATUS,
        payload: { taskId: task.id, done: isCompleted },
      });
    });
    setLoading(false);
  };

  if (!allowToMarkTaskAsDone) {
    return null;
  }

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  return (
    <div className="wpqt-flex wpqt-justify-center">
      {isTaskCompleted ? (
        <CheckBadgeIcon
          className="wpqt-size-6 wpqt-icon-green"
          onClick={(e) => {
            e.stopPropagation();
            changeDone(false);
          }}
        />
      ) : (
        <CheckBadgeIcon
          className="wpqt-size-6 wpqt-icon-gray"
          onClick={(e) => {
            e.stopPropagation();
            changeDone(true);
          }}
        />
      )}
    </div>
  );
}

export { TaskActions };
