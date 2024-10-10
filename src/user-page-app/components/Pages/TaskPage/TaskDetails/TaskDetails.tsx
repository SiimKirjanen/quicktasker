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
  return (
    <div>
      <h2 className="wpqt-mb-2 wpqt-text-lg">
        {__("Task Details", "quicktasker")}
      </h2>
      <DataDisplay>
        <DisplayRow label={__("Name", "quicktasker")}>{task.name}</DisplayRow>
        <DisplayRow label={__("Description", "quicktasker")}>
          {task.description}
        </DisplayRow>
        <DisplayRow label={__("Created at", "quicktasker")}>
          {task.created_at}
        </DisplayRow>
        <DisplayRow label={__("Free for all", "quicktasker")}>
          {task.free_for_all
            ? __("Yes", "quicktasker")
            : __("No", "quicktasker")}
        </DisplayRow>
        <DisplayRow label={__("Assigned users", "quicktasker")}>
          {task.assigned_users.map((user) => user.name).join(", ")}
        </DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { TaskDetails };
