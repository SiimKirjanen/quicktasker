import { __ } from "@wordpress/i18n";

import { Action } from "../../../../../../../reducers/automation-creation-reducer";
import { TargetType } from "../../../../../../../types/automation";
import {
  automationTargetStrings,
  availableAutomations,
} from "../../../../../../../utils/automations";
import { Pill } from "../../../../../../common/Pill/Pill";
import { AutomationSelection } from "../AutomationSelection/AutomationSelection";

type Props = {
  automationDispatch: React.Dispatch<Action>;
};
function AutomationTargetSelection({ automationDispatch }: Props) {
  const targetOptions = Object.keys(availableAutomations).map(
    (automationTarget) => {
      return {
        value: automationTarget,
        label:
          automationTargetStrings[automationTarget as TargetType] ||
          automationTarget,
      };
    },
  );

  return (
    <AutomationSelection title={__("Step 1. Select a target", "quicktasker")}>
      {targetOptions.map(({ value, label }) => {
        return (
          <Pill
            key={value}
            value={value}
            label={label}
            onClick={() => {
              automationDispatch({
                type: "SET_TARGET",
                payload: value as TargetType,
              });
            }}
          />
        );
      })}
    </AutomationSelection>
  );
}

export { AutomationTargetSelection };
