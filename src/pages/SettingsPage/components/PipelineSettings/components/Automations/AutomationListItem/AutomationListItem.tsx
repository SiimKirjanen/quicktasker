import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { Automation } from "../../../../../../../types/automation";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../../../../utils/automations";
import { AutomationActionTarget } from "../AutomationActionTarget/AutomationActionTarget";
import { AutomationControls } from "../AutomationControls/AutomationControls";

type Props = {
  automation: Automation;
};
function AutomationListItem({ automation }: Props) {
  const cardStyleClasses =
    "wpqt-px-3 wpqt-pt-1 wpqt-min-w-[60px] wpqt-cursor-default";
  const cardTitleClasses =
    "wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1";
  const hasActionTarget =
    automation.automation_action_target_id !== null &&
    automation.automation_action_target_type !== null;
  const hasMeta = automation.metadata !== null;

  return (
    <div className="wpqt-flex wpqt-gap-3 wpqt-p-4 wpqt-items-center">
      <WPQTCard
        title={__("Target", "quicktasker")}
        className={cardStyleClasses}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-justify-center">
          {automationTargetStrings[automation.target_type]}
        </div>
      </WPQTCard>
      <ArrowRightCircleIcon className="wpqt-icon-blue wpqt-size-6" />
      <WPQTCard
        title={__("Trigger", "quicktasker")}
        className={cardStyleClasses}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-justify-center">
          {automationTriggerStrings[automation.automation_trigger]}
        </div>
      </WPQTCard>
      <ArrowRightCircleIcon className="wpqt-icon-blue wpqt-size-6" />
      <WPQTCard
        title={__("Action", "quicktasker")}
        className={cardStyleClasses}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-flex-col wpqt-justify-center wpqt-items-center">
          {automationActionStrings[automation.automation_action]}
          {hasActionTarget && (
            <AutomationActionTarget
              actionTargetId={automation.automation_action_target_id}
              actionTargetType={automation.automation_action_target_type}
            />
          )}
          {hasMeta && <div>{automation.metadata}</div>}
        </div>
      </WPQTCard>

      <AutomationControls
        automation={automation}
        className={`${cardStyleClasses} wpqt-ml-6`}
        titleClassName={cardTitleClasses}
      />
    </div>
  );
}

export { AutomationListItem };
