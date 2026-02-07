import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { SiProbot } from "react-icons/si";
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

function isAutomationReady(automation: AutomationCreationState) {
  if (!automation.automationTarget) return false;
  if (!automation.automationTrigger) return false;
  if (!automation.automationAction) return false;
  if (
    automation.automationAction.requireAutomationTarget &&
    automation.automationAction.requireAutomationTargetType &&
    (automation.automationActionTargetType === null ||
      automation.automationActionTargetId === null)
  ) {
    return false;
  }
  if (automation.automationAction.requireMetaData && !automation.metaData) {
    return false;
  }
  return true;
}

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
  let stepComponent = null;

  if (automation.automationTarget === null) {
    stepComponent = (
      <AutomationTargetSelection automationDispatch={automationDispatch} />
    );
  } else if (automation.automationTrigger === null) {
    stepComponent = (
      <AutomationTriggerSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  } else if (automation.automationAction === null) {
    stepComponent = (
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
    stepComponent = (
      <AutomationActionTargetSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  } else if (
    automation.automationAction.requireMetaData &&
    !automation.metaData
  ) {
    stepComponent = (
      <AutomationMeta
        automationCreationState={automation}
        automationDispatch={automationDispatch}
      />
    );
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-4">
      <div className="wpqt-flex wpqt-flex-row wpqt-gap-4">{stepComponent}</div>
      <WPQTIconButton
        text={__("Create automation", "quicktasker")}
        icon={<SiProbot className="wpqt-size-6 wpqt-text-blue-400" />}
        onClick={handleCreateAutomation}
        loading={creationLoading}
        disabled={!isAutomationReady(automation)}
      />
    </div>
  );
}

export { AutomationCreationSteps };
