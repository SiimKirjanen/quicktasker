import { __ } from "@wordpress/i18n";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../../../../reducers/automation-creation-reducer";
import { TargetType } from "../../../../../../../../../types/automation";
import { availableAutomations } from "../../../../../../../../../utils/automations";

type Props = {
  automationDispatch: React.Dispatch<Action>;
  automation: AutomationCreationState;
};
function AutomationTargetSelection({ automationDispatch }: Props) {
  const targetOptions = Object.keys(availableAutomations).map(
    (automationTarget) => {
      return {
        value: automationTarget,
        label: automationTarget,
      };
    },
  );

  return (
    <div>
      <div>{__("Step 1 select a target", "quicktasker")}</div>
      <div>
        {targetOptions.map(({ value, label }) => {
          return (
            <div
              key={value}
              onClick={() => {
                automationDispatch({
                  type: "SET_TARGET",
                  payload: value as TargetType,
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

export { AutomationTargetSelection };
