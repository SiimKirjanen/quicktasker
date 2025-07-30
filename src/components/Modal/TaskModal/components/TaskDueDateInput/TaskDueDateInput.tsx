import { useEffect, useState } from "@wordpress/element";
import dayjs from "dayjs";
import DateTimePicker from "react-datetime-picker";
import { DATETIME_FORMAT } from "../../../../../constants";
import { useTaskActions } from "../../../../../hooks/actions/useTaskActions";
import { useTimezone } from "../../../../../hooks/useTimezone";
import { Task, TaskFromServer } from "../../../../../types/task";
import { Loading } from "../../../../Loading/Loading";

type TaskDueDateInputProps = {
  initialValue: string;
  task: Task;
  onEditTaskCompleted: (taskUpdated: TaskFromServer) => void;
};
function TaskDueDateInput({
  initialValue,
  task,
  onEditTaskCompleted,
}: TaskDueDateInputProps) {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const { editTask } = useTaskActions();
  const { convertUTCDateTimeToWPTimezone } = useTimezone();

  useEffect(() => {
    const taskDueDate = initialValue
      ? convertUTCDateTimeToWPTimezone(initialValue)
      : null;

    setDueDate(taskDueDate);
  }, [initialValue]);

  const handleChange = async (value: Date | null) => {
    const oldDueDate = dueDate;
    const dueDateString = value
      ? dayjs(value).utc().format(DATETIME_FORMAT)
      : "";

    setDueDate(value);
    setLoading(true);
    const { success, task: updatedTask } = await editTask(task.id, {
      due_date: dueDateString,
    });
    setLoading(false);

    if (success && updatedTask) {
      onEditTaskCompleted(updatedTask);
    } else {
      setDueDate(oldDueDate);
    }
  };

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
      <DateTimePicker
        onChange={(value) => {
          handleChange(value);
        }}
        value={dueDate}
        format="y-MM-dd HH:mm"
      />
      {loading && <Loading ovalSize="20" />}
    </div>
  );
}

export { TaskDueDateInput };
