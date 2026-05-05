import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { WPQTButton } from "../../../../../../components/common/Button/Button";
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
    <div
      data-testid="automation-creation-steps"
      className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-4"
    >
      <div className="wpqt-flex wpqt-flex-row wpqt-gap-4">{stepComponent}</div>
      <WPQTButton
        className="wpqt-self-end"
        btnText={__("Create automation", "quicktasker")}
        onClick={handleCreateAutomation}
        loading={creationLoading}
        disabled={!isAutomationReady(automation)}
      />
    </div>
  );
}

export { AutomationCreationSteps };
