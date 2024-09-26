import { useContext } from "@wordpress/element";
import { WPQTSelect } from "../../../../../components/common/Select/WPQTSelect";
import { Task } from "../../../../../types/task";
import { UserPageTaskContext } from "../../../../providers/UserPageTaskContextProvider";
import { useTaskActions } from "../../../../hooks/actions/useTaskActions";
import { UserPageAppContext } from "../../../../providers/UserPageAppContextProvider";
import { SET_USER_PAGE_TASK_DATA } from "../../../../constants";

type Props = {
  task: Task | null;
};
function TaskStageSelect({ task }: Props) {
  const {
    state: { taskStages },
    userTaskDispatch,
  } = useContext(UserPageTaskContext);
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { changeTaskStage } = useTaskActions();

  const stageOptions = taskStages.map((stage) => {
    return {
      label: stage.name,
      value: stage.id,
    };
  });
  const taskChange = async (stageId: string) => {
    await changeTaskStage(task!.task_hash, stageId, pageHash, (data) => {
      userTaskDispatch({ type: SET_USER_PAGE_TASK_DATA, payload: data });
    });
  };

  if (task === null) {
    return null;
  }

  return (
    <WPQTSelect
      options={stageOptions}
      onSelectionChange={taskChange}
      selectedOptionValue={task.stage_id}
      allSelector={false}
    />
  );
}

export { TaskStageSelect };
