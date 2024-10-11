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
  const rowClasses =
    "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mb-4 wpqt-gap-2 wpqt-text-xl";

  return (
    <div className="wpqt-mb-4">
      <h2 className="wpqt-text-xl2 wpqt-mb-8 wpqt-text-center">
        {__("User details", "quicktasker")}
      </h2>
      <DataDisplay>
        <DisplayRow label={__("Name", "quicktasker")} className={rowClasses}>
          {user.name}
        </DisplayRow>
        {user.description && (
          <DisplayRow
            label={__("Description", "quicktasker")}
            className={rowClasses}
          >
            {user.description}
          </DisplayRow>
        )}
        <DisplayRow
          label={__("Assigned tasks count", "quicktasker")}
          className={rowClasses}
        >
          {user.assigned_tasks_count}
        </DisplayRow>
      </DataDisplay>
    </div>
  );
}

export { UserDetails };
