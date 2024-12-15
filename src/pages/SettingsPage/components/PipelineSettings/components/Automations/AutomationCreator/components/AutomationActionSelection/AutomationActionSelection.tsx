import { __ } from "@wordpress/i18n";
import { Pill } from "../../../../../../../../../components/common/Pill/Pill";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../../../../reducers/automation-creation-reducer";
import {
  automationActionStrings,
  availableAutomations,
} from "../../../../../../../../../utils/automations";
import { AutomationSelection } from "../AutomationSelection/AutomationSelection";

type Props = {
  automationDispatch: React.Dispatch<Action>;
  automation: AutomationCreationState;
};

function AutomationActionSelection({ automationDispatch, automation }: Props) {
  if (!automation.automationTarget || !automation.automationTrigger) {
    return null;
  }
  const target = automation.automationTarget;
  const trigger = automation.automationTrigger;
  const actionOptions =
    availableAutomations[target as keyof typeof availableAutomations][trigger];
  return (
    <AutomationSelection title={__("Step 3. Select action", "quicktasker")}>
      {actionOptions.map((actionType) => {
        return (
          <Pill
            key={actionType.id}
            value={actionType.id}
            label={automationActionStrings[actionType.id]}
            onClick={() => {
              automationDispatch({
                type: "SET_ACTION",
                payload: actionType,
              });
            }}
          />
        );
      })}
    </AutomationSelection>
  );
}

export { AutomationActionSelection };
