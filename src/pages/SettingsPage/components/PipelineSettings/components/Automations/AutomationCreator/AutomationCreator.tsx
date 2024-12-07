import { useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsRobot } from "react-icons/bs";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import {
  Action,
  automationCreationInitialState,
  automationCreationReducer,
  AutomationCreationState,
} from "../../../../../../../reducers/automation-creation-reducer";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../../../../utils/automations";
import { AutomationTargetSelection } from "./components/AutomationTargetSelection/AutomationTargetSelection";

type props = {
  pipelineId: string;
};
// eslint-disable-next-line no-empty-pattern
function AutomationCreator({}: props) {
  const [showCreator, setShowCreator] = useState(false);
  const [automation, automationDispatch] = useReducer(
    automationCreationReducer,
    automationCreationInitialState,
  );

  const cardStyleClasses =
    "wpqt-px-3 wpqt-pt-1 wpqt-min-w-[60px] wpqt-cursor-pointer";
  const cardTitleClasses =
    "wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1";

  if (!showCreator) {
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
      <div className="wpqt-flex wpqt-gap-3 wpqt-main-border wpqt-p-4 wpqt-justify-center">
        <WPQTCard
          title={__("Target", "quicktasker")}
          className={cardStyleClasses}
          titleClassName={cardTitleClasses}
        >
          <div className="wpqt-flex wpqt-justify-center">
            {automation.automationTarget
              ? automationTargetStrings[automation.automationTarget]
              : "?"}
          </div>
        </WPQTCard>
        <WPQTCard
          title={__("Trigger", "quicktasker")}
          className={cardStyleClasses}
          titleClassName={cardTitleClasses}
        >
          <div className="wpqt-flex wpqt-justify-center">
            {automation.automationTrigger
              ? automationTriggerStrings[automation.automationTrigger]
              : "?"}
          </div>
        </WPQTCard>
        <WPQTCard
          title={__("Action", "quicktasker")}
          className={cardStyleClasses}
          titleClassName={cardTitleClasses}
        >
          <div className="wpqt-flex wpqt-justify-center">
            {automation.automationAction
              ? automationActionStrings[automation.automationAction]
              : "?"}
          </div>
        </WPQTCard>
      </div>
      <div className="wpqt-flex wpqt-justify-center">
        <AutomationCreationStep
          automation={automation}
          automationDispatch={automationDispatch}
        />
      </div>
      <WPQTIconButton
        icon={<BsRobot className="wpqt-size-5" />}
        text={__("Close automation creator", "quicktasker")}
        onClick={() => setShowCreator(false)}
      />
    </div>
  );
}

type AutomationCreationStepProps = {
  automation: AutomationCreationState;
  automationDispatch: React.Dispatch<Action>;
};
function AutomationCreationStep({
  automation,
  automationDispatch,
}: AutomationCreationStepProps) {
  if (automation.automationTarget === null) {
    return (
      <AutomationTargetSelection
        automationDispatch={automationDispatch}
        automation={automation}
      />
    );
  }
  if (automation.automationTrigger === null) {
    return <div>Step 2 select trigger</div>;
  }
  if (automation.automationAction === null) {
    return <div>Step 3 select action</div>;
  }
}

export { AutomationCreator };
