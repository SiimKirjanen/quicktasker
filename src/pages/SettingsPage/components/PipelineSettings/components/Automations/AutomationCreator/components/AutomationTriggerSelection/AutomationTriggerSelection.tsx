import { __ } from "@wordpress/i18n";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../../../../reducers/automation-creation-reducer";
import { AutomationTrigger } from "../../../../../../../../../types/automation";
import { availableAutomations } from "../../../../../../../../../utils/automations";

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
      label: automationTrigger,
    };
  });

  return (
    <div>
      <div>{__("Step 2 select a trigger", "quicktasker")}</div>
      <div>
        {triggerOptions.map(({ value, label }) => {
          return (
            <div
              key={value}
              onClick={() => {
                automationDispatch({
                  type: "SET_TRIGGER",
                  payload: value as AutomationTrigger,
                });
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { AutomationTriggerSelection };
