import { useEffect, useState } from "@wordpress/element";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../../constants";
import { useTaskActions } from "../../../../../hooks/actions/useTaskActions";
import { Task, TaskFromServer } from "../../../../../types/task";
import { WPQTInput } from "../../../../common/Input/Input";

type TaskNameInputProps = {
  task: Task;
  onEditTaskCompleted: (taskUpdated: TaskFromServer) => void;
};
function TaskNameInput({ task, onEditTaskCompleted }: TaskNameInputProps) {
  const [taskName, setTaskName] = useState(task.name);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editTask } = useTaskActions();

  useEffect(() => {
    if (!dirty) return;
    const timeout = setTimeout(() => {
      setDirty(false);
      updateValue(taskName);
    }, TEXT_ENTER_DEBOUNCE_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [taskName, dirty]);

  const updateValue = async (newValue: string) => {
    setLoading(true);
    const { success, task: updatedTask } = await editTask(task.id, {
      name: newValue,
    });
    setLoading(false);

    if (success && updatedTask) {
      onEditTaskCompleted(updatedTask);
    } else {
      setTaskName(task.name);
    }
  };

  const handleChange = (newValue: string) => {
    setTaskName(newValue);
    setDirty(true);
  };

  return (
    <WPQTInput
      isAutoFocus={true}
      value={taskName}
      onChange={handleChange}
      wrapperClassName="wpqt-w-full"
      className="wpqt-w-full"
      disabled={loading}
      loading={loading}
    />
  );
}

export { TaskNameInput };
