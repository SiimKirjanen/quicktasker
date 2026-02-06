import { __ } from "@wordpress/i18n";

import { Pill } from "../../../../../../components/common/Pill/Pill";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../reducers/automation-creation-reducer";
import { AutomationTrigger } from "../../../../../../types/automation";
import {
  automationTriggerStrings,
  availableAutomations,
} from "../../../../../../utils/automations";
import { AutomationSelection } from "../AutomationSelection/AutomationSelection";

type Props = {
  automationDispatch: React.Dispatch<Action>;
  automation: AutomationCreationState;
};
function AutomationTriggerSelection({ automationDispatch, automation }: Props) {
  if (!automation.automationTarget) {
    return null;
  }

  const target = automation.automationTarget;
  const triggerOptions = Object.keys(
    availableAutomations[target as keyof typeof availableAutomations],
  ).map((automationTrigger) => {
    return {
      value: automationTrigger,
      label:
        automationTriggerStrings[automationTrigger as AutomationTrigger] ||
        automationTrigger,
    };
  });

  return (
    <AutomationSelection title={__("Step 2. Select a trigger", "quicktasker")}>
      {triggerOptions.map(({ value, label }) => {
        return (
          <Pill
            key={value}
            value={value}
            label={label}
            onClick={() => {
              automationDispatch({
                type: "SET_TRIGGER",
                payload: value as AutomationTrigger,
              });
            }}
          />
        );
      })}
    </AutomationSelection>
  );
}

export { AutomationTriggerSelection };
