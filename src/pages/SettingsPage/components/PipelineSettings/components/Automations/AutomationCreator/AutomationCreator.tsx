import { useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsRobot } from "react-icons/bs";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import { useAutomationActions } from "../../../../../../../hooks/actions/useAutomationActions";
import {
  automationCreationInitialState,
  automationCreationReducer,
} from "../../../../../../../reducers/automation-creation-reducer";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../../../../utils/automations";
import { AutomationCreationSteps } from "./components/AutomationCreationSteps/AutomationCreationSteps";

type props = {
  pipelineId: string;
};
function AutomationCreator({ pipelineId }: props) {
  const [showCreator, setShowCreator] = useState(false);
  const [creationLoading, setCreationLoading] = useState(false);
  const [automation, automationDispatch] = useReducer(
    automationCreationReducer,
    automationCreationInitialState,
  );
  const { createAutomation } = useAutomationActions();

  const cardStyleClasses =
    "wpqt-px-3 wpqt-pt-1 wpqt-min-w-[60px] wpqt-cursor-pointer";
  const cardTitleClasses =
    "wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1";

  const onCreateAnimation = async () => {
    setCreationLoading(true);
    await createAutomation(pipelineId, automation, (success: boolean) => {
      if (success) {
        automationDispatch({ type: "RESET" });
      }
    });
    setCreationLoading(false);
  };

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
        <AutomationCreationSteps
          automation={automation}
          automationDispatch={automationDispatch}
          createAnimation={onCreateAnimation}
          creationLoading={creationLoading}
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

export { AutomationCreator };
