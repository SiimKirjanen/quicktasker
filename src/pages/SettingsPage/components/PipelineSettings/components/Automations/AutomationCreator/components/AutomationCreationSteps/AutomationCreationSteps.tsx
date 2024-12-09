import { useState } from "@wordpress/element";
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
  createAutomation: () => Promise<void>;
};
function AutomationCreationSteps({
  automation,
  automationDispatch,
  createAutomation,
}: Props) {
  const [creationLoading, setCreationLoading] = useState(false);

  const handleCreateAutomation = async () => {
    setCreationLoading(true);
    await createAutomation();
    setCreationLoading(false);
  };

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
      text={__("Create automation", "quicktasker")}
      icon={<TfiSave className="wpqt-icon-blue wpqt-size-4" />}
      onClick={handleCreateAutomation}
      loading={creationLoading}
    />
  );
}

export { AutomationCreationSteps };
