import { UserCircleIcon } from "@heroicons/react/24/outline";
import { User, WPUser } from "../../../types/user";

import { AutomationAction } from "../../../types/automation";
import { WPQTDropdown } from "../WPQTDropdown";
import { AutomationActionTargetUserSelection } from "./components/AutomationActionTargetUserSelection/AutomationActionTargetSelection";

type Props = {
  automationAction: AutomationAction;
  onUserAdd?: (target: User | WPUser) => void;
  quickTaskerUserTargets?: User[];
  wpUserTargets?: WPUser[];
  menuBtnClasses?: string;
};

function AutomationActionTargetDropdown({
  automationAction,
  onUserAdd = () => {},
  quickTaskerUserTargets = [],
  wpUserTargets = [],
  menuBtnClasses = "",
}: Props) {
  const userTargets = [...quickTaskerUserTargets, ...wpUserTargets];
  const hasAssignedUsers = userTargets.length > 0;

  return (
    <WPQTDropdown
      menuBtnClasses={`wpqt-inline-flex ${menuBtnClasses}`}
      anchor="bottom start"
      menuBtn={() => (
        <div className="wpqt-group wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1">
          <UserCircleIcon
            className={`wpqt-mr-1 wpqt-size-5 ${hasAssignedUsers ? "wpqt-text-blue-400" : "wpqt-text-gray-300"} group-hover:wpqt-text-blue-600`}
          />
        </div>
      )}
    >
      {automationAction === AutomationAction.ASSIGN_USER && (
        <AutomationActionTargetUserSelection
          quickTaskerUsers={quickTaskerUserTargets}
          wpUsers={wpUserTargets}
          assignUser={onUserAdd}
        />
      )}
    </WPQTDropdown>
  );
}

export { AutomationActionTargetDropdown };
