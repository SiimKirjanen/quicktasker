import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PiFlagCheckeredFill } from "react-icons/pi";

import { WPQTIconButton } from "../../../../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import {
  Action,
  AutomationCreationState,
} from "../../../../../../reducers/automation-creation-reducer";
import { AutomationActionSelection } from "../AutomationActionSelection/AutomationActionSelection";
import { AutomationActionTargetSelection } from "../AutomationActionTargetSelection/AutomationActionTargetSelection";
import { AutomationMeta } from "../AutomationMeta/AutomationMeta";
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
  } else if (automation.automationTrigger === null) {
    return (
      <AutomationTriggerSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  } else if (automation.automationAction === null) {
    return (
      <AutomationActionSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  } else if (
    automation.automationAction &&
    automation.automationAction.requireAutomationTarget &&
    automation.automationAction.requireAutomationTargetType &&
    (automation.automationActionTargetType === null ||
      automation.automationActionTargetId === null)
  ) {
    return (
      <AutomationActionTargetSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  } else if (
    automation.automationAction.requireMetaData &&
    !automation.metaData
  ) {
    return (
      <AutomationMeta
        automationCreationState={automation}
        automationDispatch={automationDispatch}
      />
    );
  }

  return (
    <WPQTIconButton
      text={__("Create automation", "quicktasker")}
      icon={<PiFlagCheckeredFill className="wpqt-size-6" />}
      onClick={handleCreateAutomation}
      loading={creationLoading}
    />
  );
}

export { AutomationCreationSteps };
