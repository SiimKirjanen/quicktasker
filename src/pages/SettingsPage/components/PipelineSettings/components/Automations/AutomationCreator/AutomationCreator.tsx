import {
  ArrowRightCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsRobot } from "react-icons/bs";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import { PremiumAd } from "../../../../../../../components/PremiudAd/PremiumAd";
import {
  ADD_PIPELINE_AUTOMATION,
  HAS_AUTOMATIONS,
  RESET_AUTOMATION_TO_ACTION,
  RESET_AUTOMATION_TO_TARGET,
  RESET_AUTOMATION_TO_TRIGGER,
} from "../../../../../../../constants";
import { useAutomationActions } from "../../../../../../../hooks/actions/useAutomationActions";
import { PipelineAutomationsContext } from "../../../../../../../providers/PipelineAutomationsContextProvider";
import {
  automationCreationInitialState,
  automationCreationReducer,
} from "../../../../../../../reducers/automation-creation-reducer";
import { Automation } from "../../../../../../../types/automation";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../../../../utils/automations";
import { AutomationActionTarget } from "../AutomationActionTarget/AutomationActionTarget";
import { AutomationCreationSteps } from "./components/AutomationCreationSteps/AutomationCreationSteps";

type props = {
  pipelineId: string;
};
function AutomationCreator({ pipelineId }: props) {
  const {
    pipelineAutomationsDispatch,
    state: { loading, automations },
  } = useContext(PipelineAutomationsContext);
  const [showCreator, setShowCreator] = useState(false);
  const [automation, automationDispatch] = useReducer(
    automationCreationReducer,
    automationCreationInitialState,
  );
  const { createAutomation } = useAutomationActions();
  const hasActionTarget =
    automation.automationActionTargetId !== null &&
    automation.automationActionTargetType !== null;
  const hasMeta = automation.metaData !== null;
  const automationsLimitReached =
    !HAS_AUTOMATIONS && automations && automations.length >= 1;

  const cardStyleClasses = "wpqt-px-3 wpqt-min-w-[60px] wpqt-cursor-pointer";
  const cardTitleClasses =
    "wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1";
  const onCreateAutomation = async () => {
    await createAutomation(
      pipelineId,
      automation,
      (success: boolean, createdAutomation: Automation | null) => {
        if (success && createdAutomation) {
          resetAutomationState();
          setShowCreator(false);
          pipelineAutomationsDispatch({
            type: ADD_PIPELINE_AUTOMATION,
            payload: createdAutomation,
          });
        }
      },
    );
  };
  const resetAutomationState = () => {
    automationDispatch({ type: "RESET" });
  };

  if (loading) {
    return null;
  }

  if (!showCreator) {
    if (automationsLimitReached) {
      return (
        <PremiumAd
          description={__(
            "Free version limit reached. Upgrade to premium to create more automations.",
            "quicktasker",
          )}
        />
      );
    }
    return (
      <div>
        <WPQTIconButton
          icon={<BsRobot className="wpqt-size-5" />}
          text={__("Create a new automation", "quicktasker")}
          onClick={() => setShowCreator(true)}
        />
      </div>
    );
  }
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3">
      <div className="wpqt-flex wpqt-gap-3 wpqt-p-4 wpqt-justify-center wpqt-items-center">
        <WPQTCard
          title={__("Target", "quicktasker")}
          className={cardStyleClasses}
          titleClassName={cardTitleClasses}
          onClick={() => {
            automationDispatch({ type: RESET_AUTOMATION_TO_TARGET });
          }}
        >
          <div className="wpqt-flex wpqt-justify-center">
            {automation.automationTarget ? (
              automationTargetStrings[automation.automationTarget]
            ) : (
              <QuestionMarkIcon />
            )}
          </div>
        </WPQTCard>
        <ArrowRightCircleIcon className="wpqt-icon-blue wpqt-size-6" />
        <WPQTCard
          title={__("Trigger", "quicktasker")}
          className={cardStyleClasses}
          titleClassName={cardTitleClasses}
          onClick={() => {
            automationDispatch({ type: RESET_AUTOMATION_TO_TRIGGER });
          }}
        >
          <div className="wpqt-flex wpqt-justify-center">
            {automation.automationTrigger ? (
              automationTriggerStrings[automation.automationTrigger]
            ) : (
              <QuestionMarkIcon />
            )}
          </div>
        </WPQTCard>
        <ArrowRightCircleIcon className="wpqt-icon-blue wpqt-size-6" />
        <WPQTCard
          title={__("Action", "quicktasker")}
          className={cardStyleClasses}
          titleClassName={cardTitleClasses}
          onClick={() => {
            automationDispatch({ type: RESET_AUTOMATION_TO_ACTION });
          }}
        >
          <div className="wpqt-flex wpqt-flex-col wpqt-justify-center wpqt-items-center">
            {automation.automationAction ? (
              automationActionStrings[automation.automationAction.id]
            ) : (
              <QuestionMarkIcon />
            )}
            {hasActionTarget && (
              <AutomationActionTarget
                actionTargetId={automation.automationActionTargetId}
                actionTargetType={automation.automationActionTargetType}
              />
            )}
            {hasMeta && <div>{automation.metaData}</div>}
          </div>
        </WPQTCard>
      </div>
      <div className="wpqt-flex wpqt-justify-center">
        <AutomationCreationSteps
          automation={automation}
          automationDispatch={automationDispatch}
          createAutomation={onCreateAutomation}
        />
      </div>
      <div className="wpqt-flex wpqt-justify-center">
        <WPQTIconButton
          icon={<BsRobot className="wpqt-size-5" />}
          text={__("Close automation creator", "quicktasker")}
          onClick={() => {
            setShowCreator(false);
            resetAutomationState();
          }}
        />
      </div>
    </div>
  );
}

function QuestionMarkIcon() {
  return <QuestionMarkCircleIcon className="wpqt-size-7 wpqt-text-gray-300" />;
}

export { AutomationCreator };
