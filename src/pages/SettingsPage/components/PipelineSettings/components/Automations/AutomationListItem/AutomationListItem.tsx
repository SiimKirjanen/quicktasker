import { ArrowRightCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../../../../components/Card/Card";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import { REMOVE_PIPELINE_AUTOMATION } from "../../../../../../../constants";
import { useAutomationActions } from "../../../../../../../hooks/actions/useAutomationActions";
import { PipelineAutomationsContext } from "../../../../../../../providers/PipelineAutomationsContextProvider";
import { Automation } from "../../../../../../../types/automation";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../../../../utils/automations";
import { AutomationActionTarget } from "../AutomationActionTarget/AutomationActionTarget";

type Props = {
  automation: Automation;
};
function AutomationListItem({ automation }: Props) {
  const { pipelineAutomationsDispatch } = useContext(
    PipelineAutomationsContext,
  );
  const { deleteAutomation } = useAutomationActions();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const cardStyleClasses =
    "wpqt-px-3 wpqt-pt-1 wpqt-min-w-[60px] wpqt-cursor-default";
  const cardTitleClasses =
    "wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1";
  const hasActionTarget =
    automation.automation_action_target_id !== null &&
    automation.automation_action_target_type !== null;
  const hasMeta = automation.metadata !== null;

  const onDelete = async () => {
    setDeleteLoading(true);
    await deleteAutomation(automation.pipeline_id, automation.id, (success) => {
      if (success) {
        pipelineAutomationsDispatch({
          type: REMOVE_PIPELINE_AUTOMATION,
          payload: automation.id,
        });
      }
    });
    setDeleteLoading(false);
  };

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
      <WPQTCard
        title={__("Controls", "quicktasker")}
        className={`${cardStyleClasses} wpqt-ml-6`}
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
