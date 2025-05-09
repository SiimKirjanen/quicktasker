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
  console.log("target", target);
  const trigger = automation.automationTrigger;
  console.log("trigger", trigger);
  console.log("availableAutomations", availableAutomations);
  const actionOptions =
    availableAutomations[target as keyof typeof availableAutomations][trigger];
  console.log("actionOptions", actionOptions);
  return (
    <AutomationSelection title={__("Step 3. Select action", "quicktasker")}>
      {actionOptions.map((actionType) => {
        console.log("Siim", automationActionStrings[actionType.id]);
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
