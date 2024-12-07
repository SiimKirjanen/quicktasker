import {
  Action,
  AutomationCreationState,
} from "../../../../../../../../../reducers/automation-creation-reducer";
import { AutomationActionSelection } from "../AutomationActionSelection/AutomationActionSelection";
import { AutomationTargetSelection } from "../AutomationTargetSelection/AutomationTargetSelection";
import { AutomationTriggerSelection } from "../AutomationTriggerSelection/AutomationTriggerSelection";

type Props = {
  automation: AutomationCreationState;
  automationDispatch: React.Dispatch<Action>;
};
function AutomationCreationSteps({ automation, automationDispatch }: Props) {
  if (automation.automationTarget === null) {
    return (
      <AutomationTargetSelection automationDispatch={automationDispatch} />
    );
  }
  if (automation.automationTrigger === null && automation.automationTarget) {
    return (
      <AutomationTriggerSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  }
  if (
    automation.automationAction === null &&
    automation.automationTrigger &&
    automation.automationTarget
  ) {
    return (
      <AutomationActionSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  }
  return null;
}

export { AutomationCreationSteps };
