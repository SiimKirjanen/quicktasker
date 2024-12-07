import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { Automation } from "../../../../../../../types/automation";

type Props = {
  automation: Automation;
};
function AutomationListItem({ automation }: Props) {
  const cardStyleClasses = "wpqt-px-3 wpqt-pt-1";

  return (
    <div className="wpqt-flex wpqt-gap-3 wpqt-main-border wpqt-p-4">
      <WPQTCard
        title={__("Target", "quicktasker")}
        className={cardStyleClasses}
      >
        {automation.target_type}
      </WPQTCard>
      <WPQTCard
        title={__("Trigger", "quicktasker")}
        className={cardStyleClasses}
      >
        {automation.automation_trigger}
      </WPQTCard>
      <WPQTCard
        title={__("Action", "quicktasker")}
        className={cardStyleClasses}
      >
        {automation.automation_action}
      </WPQTCard>
      <WPQTCard
        title={__("Controls", "quicktasker")}
        className={`${cardStyleClasses} wpqt-ml-auto`}
      >
        Controls
      </WPQTCard>
    </div>
  );
}

export { AutomationListItem };
