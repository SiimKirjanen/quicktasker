import { __ } from "@wordpress/i18n";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../../../../reducers/automation-creation-reducer";
import { availableAutomations } from "../../../../../../../../../utils/automations";

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
  const actionOptions = availableAutomations[
    target as keyof typeof availableAutomations
  ][trigger].map((action) => {
    return {
      value: action,
      label: action,
    };
  });
  return (
    <div>
      <div>{__("Step 3 select a action", "quicktasker")}</div>
      <div>
        {actionOptions.map(({ value, label }) => {
          return (
            <div
              key={value}
              onClick={() => {
                automationDispatch({
                  type: "SET_ACTION",
                  payload: value,
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

export { AutomationActionSelection };
