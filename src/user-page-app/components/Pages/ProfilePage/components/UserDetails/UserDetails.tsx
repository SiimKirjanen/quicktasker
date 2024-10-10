import {
  DataDisplay,
  DisplayRow,
} from "../../../../../../components/common/DataDisplay/DataDisplay";
import { User } from "../../../../../../types/user";
import { __ } from "@wordpress/i18n";

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
        <DisplayRow label={__("Name", "quicktasker")}>{user.name}</DisplayRow>
        <DisplayRow label={__("Description", "quicktasker")}>
          {user.description}
        </DisplayRow>
        <DisplayRow label={__("Assigned tasks count", "quicktasker")}>
          {user.assigned_tasks_count}
        </DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { UserDetails };
