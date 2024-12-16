import { __ } from "@wordpress/i18n";
import { User, WPUser } from "../../../../../types/user";
import { UserAssignementSection } from "../../../../User/UserAssignementSection/UserAssignementSection";

type Props = {
  quickTaskerUsers: User[];
  wpUsers: WPUser[];
  assignUser: (target: User | WPUser) => void;
};
function AutomationActionTargetUserSelection({
  quickTaskerUsers,
  wpUsers,
  assignUser,
}: Props) {
  return (
    <div className="wpqt-flex wpqt-w-[320px] wpqt-flex-col">
      <UserAssignementSection
        sectionTitle={__("Assign a quicktasker", "quicktasker")}
        users={quickTaskerUsers}
        onItemSelect={assignUser}
        actionIconClasses="wpqt-icon-green"
        noUsersText={__("No quicktaskers available to assign", "quicktasker")}
      />
      <UserAssignementSection
        sectionTitle={__("Assign a WordPress user", "quicktasker")}
        users={wpUsers}
        onItemSelect={assignUser}
        actionIconClasses="wpqt-icon-green"
        noUsersText={__(
          "No WordPress users with required permissions available to assign",
          "quicktasker",
        )}
      />
    </div>
  );
}

export { AutomationActionTargetUserSelection };
