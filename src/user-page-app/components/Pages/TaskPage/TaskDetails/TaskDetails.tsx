import {
  DataDisplay,
  DisplayRow,
} from "../../../../../components/common/DataDisplay/DataDisplay";
import { Task } from "../../../../../types/task";
import { __ } from "@wordpress/i18n";

type Props = {
  task: Task | null;
};
function TaskDetails({ task }: Props) {
  if (!task) {
    return null;
  }
  const rowClasses =
    "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mb-4 wpqt-gap-2 wpqt-text-xl";

  return (
    <div className="wpqt-mb-4">
      <h2 className="wpqt-text-xl2 wpqt-mb-8 wpqt-text-center">
        {__("Task Details", "quicktasker")}
      </h2>
      <DataDisplay>
        <DisplayRow label={__("Name", "quicktasker")} className={rowClasses}>
          {task.name}
        </DisplayRow>
        {task.description && (
          <DisplayRow
            label={__("Description", "quicktasker")}
            className={rowClasses}
          >
            {task.description}
          </DisplayRow>
        )}
        <DisplayRow
          label={__("Created at", "quicktasker")}
          className={rowClasses}
        >
          {task.created_at}
        </DisplayRow>
        <DisplayRow
          label={__("Free for all", "quicktasker")}
          className={rowClasses}
        >
          {task.free_for_all
            ? __("Yes", "quicktasker")
            : __("No", "quicktasker")}
        </DisplayRow>
        <DisplayRow
          label={__("Assigned users", "quicktasker")}
          className={rowClasses}
        >
          {task.assigned_users.map((user) => user.name).join(", ")}
        </DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { TaskDetails };
