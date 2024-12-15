import { __ } from "@wordpress/i18n";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../../../../reducers/automation-creation-reducer";
import { AutomationAction } from "../../../../../../../../../types/automation";
import { AutomationSelection } from "../AutomationSelection/AutomationSelection";

type Props = {
  automationDispatch: React.Dispatch<Action>;
  automation: AutomationCreationState;
};

const userAssignementActions = [AutomationAction.ASSIGN_USER];

function AutomationActionTargetSelection({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  automationDispatch,
  automation,
}: Props) {
  const showUserAssignment =
    automation.automationAction !== null &&
    userAssignementActions.includes(automation.automationAction.id);

  return (
    <AutomationSelection
      title={__("Step 4. Select action target", "quicktasker")}
    >
      {showUserAssignment && <div>tere</div>}
    </AutomationSelection>
  );
}

export { AutomationActionTargetSelection };
