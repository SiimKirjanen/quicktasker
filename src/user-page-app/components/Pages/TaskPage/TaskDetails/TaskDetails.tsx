import {
  DataDisplay,
  DisplayRow,
} from "../../../../../components/common/DataDisplay/DataDisplay";
import { Task } from "../../../../../types/task";

type Props = {
  task: Task | null;
};
function TaskDetaials({ task }: Props) {
  if (!task) {
    return null;
  }
  return (
    <div>
      <DataDisplay>
        <DisplayRow label="Name">{task.name}</DisplayRow>
        <DisplayRow label="Description">{task.description}</DisplayRow>
        <DisplayRow label="Created at">{task.created_at}</DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { TaskDetaials };
