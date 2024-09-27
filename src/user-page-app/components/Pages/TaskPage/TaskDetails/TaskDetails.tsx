import {
  DataDisplay,
  DisplayRow,
} from "../../../../../components/common/DataDisplay/DataDisplay";
import { Task } from "../../../../../types/task";

type Props = {
  task: Task | null;
};
function TaskDetails({ task }: Props) {
  if (!task) {
    return null;
  }
  return (
    <div>
      <h2 className="wpqt-mb-2 wpqt-text-lg">Task Details</h2>
      <DataDisplay>
        <DisplayRow label="Name">{task.name}</DisplayRow>
        <DisplayRow label="Description">{task.description}</DisplayRow>
        <DisplayRow label="Created at">{task.created_at}</DisplayRow>
        <DisplayRow label="Free for all">
          {task.free_for_all ? "Yes" : "No"}
        </DisplayRow>
        <DisplayRow label="Assigned users">
          {task.assigned_users.map((user) => user.name).join(", ")}
        </DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { TaskDetails };
