import { __ } from "@wordpress/i18n";
import { TfiSave } from "react-icons/tfi";
import { WPQTIconButton } from "../../../../../../../../../components/common/Button/Button";
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
  createAnimation: () => Promise<void>;
  creationLoading: boolean;
};
function AutomationCreationSteps({
  automation,
  automationDispatch,
  createAnimation,
  creationLoading,
}: Props) {
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

  return (
    <WPQTIconButton
      text={__("Create animation", "quicktasker")}
      icon={<TfiSave className="wpqt-icon-blue wpqt-size-4" />}
      onClick={createAnimation}
      loading={creationLoading}
    />
  );
}

export { AutomationCreationSteps };
