import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import { useAutomationActions } from "../../../../../../../hooks/actions/useAutomationActions";
import { Automation } from "../../../../../../../types/automation";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../../../../utils/automations";

type Props = {
  automation: Automation;
};
function AutomationListItem({ automation }: Props) {
  const { deleteAutomation } = useAutomationActions();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const cardStyleClasses = "wpqt-px-3 wpqt-pt-1 wpqt-min-w-[60px]";
  const cardTitleClasses =
    "wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1";

  const onDelete = async () => {
    setDeleteLoading(true);
    await deleteAutomation(automation.pipeline_id, automation.id, (success) => {
      if (success) {
        console.log("Automation deleted");
      }
    });
    setDeleteLoading(false);
  };

  return (
    <div className="wpqt-flex wpqt-gap-3 wpqt-main-border wpqt-p-4">
      <WPQTCard
        title={__("Target", "quicktasker")}
        className={cardStyleClasses}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-justify-center">
          {automationTargetStrings[automation.target_type]}
        </div>
      </WPQTCard>
      <WPQTCard
        title={__("Trigger", "quicktasker")}
        className={cardStyleClasses}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-justify-center">
          {automationTriggerStrings[automation.automation_trigger]}
        </div>
      </WPQTCard>
      <WPQTCard
        title={__("Action", "quicktasker")}
        className={cardStyleClasses}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-justify-center">
          {automationActionStrings[automation.automation_action]}
        </div>
      </WPQTCard>
      <WPQTCard
        title={__("Controls", "quicktasker")}
        className={`${cardStyleClasses} wpqt-ml-auto`}
        titleClassName={cardTitleClasses}
      >
        <div className="wpqt-flex wpqt-gap-2">
          <WPQTIconButton
            loading={deleteLoading}
            text={__("Delete", "quicktasker")}
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
            onClick={onDelete}
          />
        </div>
      </WPQTCard>
    </div>
  );
}

export { AutomationListItem };
