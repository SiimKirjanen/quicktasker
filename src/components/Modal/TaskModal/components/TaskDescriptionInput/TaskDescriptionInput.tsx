import { useEffect, useState } from "@wordpress/element";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../../constants";
import { useTaskActions } from "../../../../../hooks/actions/useTaskActions";
import { Task, TaskFromServer } from "../../../../../types/task";
import { WPQTTextarea } from "../../../../common/TextArea/TextArea";

type TaskDescriptionInputProps = {
  task: Task;
  onEditTaskCompleted: (taskUpdated: TaskFromServer) => void;
};
function TaskDescriptionInput({
  task,
  onEditTaskCompleted,
}: TaskDescriptionInputProps) {
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editTask } = useTaskActions();

  useEffect(() => {
    if (!dirty) return;
    const timeout = setTimeout(() => {
      setDirty(false);
      updateValue(taskDescription);
    }, TEXT_ENTER_DEBOUNCE_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [taskDescription, dirty]);

  const updateValue = async (newValue: string) => {
    setLoading(true);
    const { success, task: updatedTask } = await editTask(task.id, {
      description: newValue,
    });
    setLoading(false);

    if (success && updatedTask) {
      onEditTaskCompleted(updatedTask);
    } else {
      setTaskDescription(task.description);
    }
  };

  const handleChange = (newValue: string) => {
    setTaskDescription(newValue);
    setDirty(true);
  };

  return (
    <WPQTTextarea
      rowsCount={3}
      value={taskDescription}
      className="wpqt-w-full"
      onChange={handleChange}
      disabled={loading}
      loading={loading}
    />
  );
}

export { TaskDescriptionInput };
