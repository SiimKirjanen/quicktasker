import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { AutomationActionTargetDropdown } from "../../../../../../components/Dropdown/AutomationActionTargetDropdown/AutomationActionTargetDropdown";
import { SET_AUTOMATION_ACTION_TARGET } from "../../../../../../constants";
import { UserContext } from "../../../../../../providers/UserContextProvider";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../reducers/automation-creation-reducer";
import {
  ActionTargetType,
  AutomationAction,
} from "../../../../../../types/automation";
import { AutomationSelection } from "../AutomationSelection/AutomationSelection";

type Props = {
  automationDispatch: React.Dispatch<Action>;
  automation: AutomationCreationState;
};

const userAssignementActions = [AutomationAction.ASSIGN_USER];

function AutomationActionTargetSelection({
  automationDispatch,
  automation,
}: Props) {
  const {
    state: { users, wpUsers },
  } = useContext(UserContext);
  const automationActionId = automation.automationAction?.id;
  const showUserAssignment =
    automationActionId !== undefined &&
    userAssignementActions.includes(automationActionId);

  return (
    <AutomationSelection
      title={__("Step 4. Select action target", "quicktasker")}
    >
      {showUserAssignment && (
        <AutomationActionTargetDropdown
          automationAction={automationActionId}
          quickTaskerUserTargets={users}
          wpUserTargets={wpUsers}
          onUserAdd={(user) => {
            automationDispatch({
              type: SET_AUTOMATION_ACTION_TARGET,
              payload: {
                automationActionTargetId: user.id,
                automationActionTargetType:
                  user.user_type as unknown as ActionTargetType,
              },
            });
          }}
        />
      )}
    </AutomationSelection>
  );
}

export { AutomationActionTargetSelection };
