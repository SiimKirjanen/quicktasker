import { __ } from "@wordpress/i18n";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../../reducers/automation-creation-reducer";
import { AutomationAction } from "../../../../../../../types/automation";
import {
  automationActionStrings,
  availableAutomations,
} from "../../../../../../../utils/automations";
import { Pill } from "../../../../../../common/Pill/Pill";
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
  const targetAutomations =
    availableAutomations[target as keyof typeof availableAutomations];
  const actionOptions =
    targetAutomations && trigger in targetAutomations
      ? targetAutomations[trigger as keyof typeof targetAutomations]
      : [];

  return (
    <AutomationSelection title={__("Step 3. Select action", "quicktasker")}>
      {actionOptions.map((actionType: { id: AutomationAction }) => {
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
