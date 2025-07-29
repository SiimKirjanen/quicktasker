import { useState } from "@wordpress/element";
import { useTaskActions } from "../../../../../hooks/actions/useTaskActions";
import { Task, TaskFromServer } from "../../../../../types/task";
import { Toggle } from "../../../../common/Toggle/Toggle";
import { Loading } from "../../../../Loading/Loading";

type FreeForAllToggleProps = {
  initialValue: boolean;
  task: Task;
  onEditTaskCompleted: (task: TaskFromServer) => void;
};
function FreeForAllToggle({
  initialValue,
  task,
  onEditTaskCompleted,
}: FreeForAllToggleProps) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { editTask } = useTaskActions();

  const handleChange = async (checked: boolean) => {
    setValue(checked);
    setLoading(true);
    const { success, task: updatedTask } = await editTask(task.id, {
      freeForAll: checked,
    });
    setLoading(false);

    if (success && updatedTask) {
      onEditTaskCompleted({
        ...updatedTask,
      });
    } else {
      setValue(!checked);
    }
  };

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
      <Toggle checked={value} handleChange={handleChange} />

      {loading && <Loading ovalSize="20" />}
    </div>
  );
}

export { FreeForAllToggle };
