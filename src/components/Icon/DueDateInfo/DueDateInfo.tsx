import { ClockIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { useTimezone } from "../../../hooks/useTimezone";
import { Task } from "../../../types/task";
import { getCurrentUTCDateTime, getDateDifference } from "../../../utils/date";

type Props = {
  task: Task;
};
function DueDateInfo({ task }: Props) {
  const { convertToWPTimezone } = useTimezone();

  if (!task.due_date) {
    return null;
  }

  function getDueDateClockColorClass(dueDate: string): string {
    const difference = getDateDifference(getCurrentUTCDateTime(), dueDate);

    // Past due
    if (difference.milliseconds < 0) {
      return "wpqt-text-red-600"; // Overdue - red
    }

    // Due within 24 hours
    if (difference.hours < 24) {
      return "wpqt-text-amber-500"; // Due soon - amber/orange
    }

    // Due within 3 days
    if (difference.hours < 72) {
      return "wpqt-text-yellow-500"; // Approaching - yellow
    }

    // More than 3 days away
    return "wpqt-icon-blue";
  }

  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-gap-2 wpqt-items-center">
      <ClockIcon
        className={`wpqt-size-5 ${getDueDateClockColorClass(task.due_date)}`}
      />
      <span className="wpqt-font-semibold">
        {__("Due date", "quicktasker")}:
      </span>
      {convertToWPTimezone(task.due_date)}
    </div>
  );
}

export { DueDateInfo };
