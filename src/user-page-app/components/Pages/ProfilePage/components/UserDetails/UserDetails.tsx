import {
  DataDisplay,
  DisplayRow,
} from "../../../../../../components/common/DataDisplay/DataDisplay";
import { User } from "../../../../../../types/user";

type Props = {
  user: User | null;
};
function UserDetails({ user }: Props) {
  if (!user) {
    return null;
  }
  return (
    <div className="wpqt-mb-4">
      <DataDisplay>
        <DisplayRow label="Name">{user.name}</DisplayRow>
        <DisplayRow label="Description">{user.description}</DisplayRow>
        <DisplayRow label="Assigned tasks count">
          {user.assigned_tasks_count}
        </DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { UserDetails };
