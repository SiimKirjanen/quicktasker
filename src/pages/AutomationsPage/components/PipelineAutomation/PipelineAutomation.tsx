import {
  EllipsisHorizontalIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TbLogs } from "react-icons/tb";

import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { WPQTConfirmTooltip } from "../../../../components/Dialog/ConfirmTooltip/ConfirmTooltip";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../../../../components/Dropdown/WPQTDropdown";
import {
  OPEN_AUTOMATION_LOGS_MODAL,
  REMOVE_PIPELINE_AUTOMATION,
  UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
} from "../../../../constants";
import { useAutomationActions } from "../../../../hooks/actions/useAutomationActions";
import { AppContext } from "../../../../providers/AppContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { PipelineAutomationsContext } from "../../../../providers/PipelineAutomationsContextProvider";
import { Automation } from "../../../../types/automation";
import {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
} from "../../../../utils/automations";
import { convertToTimezone } from "../../../../utils/timezone";
import { AutomationActionTarget } from "../AutomationActionTarget/AutomationActionTarget";

type Props = {
  automation: Automation;
};

const chipClasses =
  "wpqt-inline-flex wpqt-items-center wpqt-rounded wpqt-px-2 wpqt-py-0.5 wpqt-text-xs wpqt-font-mono wpqt-font-semibold";

function PipelineAutomation({ automation }: Props) {
  const {
    state: { timezone },
  } = useContext(AppContext);
  const hasActionTarget =
    automation.automation_action_target_id !== null &&
    automation.automation_action_target_type !== null;
  const hasMeta = automation.metadata !== null;

  const triggerLabel = automationTriggerStrings[automation.automation_trigger];
  const actionLabel = automationActionStrings[automation.automation_action];
  const targetLabel = automationTargetStrings[automation.target_type];

  return (
    <WPQTCard
      title={`${triggerLabel} → ${actionLabel}`}
      dropdown={<AutomationDropdown automation={automation} />}
      dataTestId="pipeline-automation"
      className="wpqt-w-full"
    >
      <WPQTCardDataItem
        label={__("Target", "quicktasker")}
        value={
          <span
            className={`${chipClasses} wpqt-bg-gray-100 wpqt-text-gray-800`}
          >
            {targetLabel}
          </span>
        }
      />
      <WPQTCardDataItem
        label={__("Trigger", "quicktasker")}
        value={
          <span
            className={`${chipClasses} wpqt-bg-blue-100 wpqt-text-blue-800`}
          >
            {triggerLabel}
          </span>
        }
      />
      <WPQTCardDataItem
        label={__("Action", "quicktasker")}
        value={
          <div className="wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-2">
            <span
              className={`${chipClasses} wpqt-bg-green-100 wpqt-text-green-800`}
            >
              {actionLabel}
            </span>
            {hasActionTarget && (
              <AutomationActionTarget
                actionTargetId={automation.automation_action_target_id}
                actionTargetType={automation.automation_action_target_type}
              />
            )}
            {hasMeta && (
              <span className="wpqt-text-sm wpqt-text-gray-700 wpqt-break-all">
                {automation.metadata}
              </span>
            )}
          </div>
        }
      />
      <WPQTCardDataItem
        label={__("Status", "quicktasker")}
        value={
          automation.active ? (
            <span className="wpqt-inline-flex wpqt-items-center wpqt-gap-1 wpqt-text-green-700">
              <span className="wpqt-h-2 wpqt-w-2 wpqt-rounded-full wpqt-bg-green-500" />
              {__("Active", "quicktasker")}
            </span>
          ) : (
            <span className="wpqt-inline-flex wpqt-items-center wpqt-gap-1 wpqt-text-gray-500">
              <span className="wpqt-h-2 wpqt-w-2 wpqt-rounded-full wpqt-bg-gray-400" />
              {__("Inactive", "quicktasker")}
            </span>
          )
        }
      />
      <WPQTCardDataItem
        label={__("Created", "quicktasker")}
        value={convertToTimezone(automation.created_at, timezone)}
      />
    </WPQTCard>
  );
}

function AutomationDropdown({ automation }: { automation: Automation }) {
  const { deleteAutomation, updateAutomationActiveStatus } =
    useAutomationActions();
  const { pipelineAutomationsDispatch } = useContext(
    PipelineAutomationsContext,
  );
  const { modalDispatch } = useContext(ModalContext);
  const [activateLoading, setActivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleToggleActive = async () => {
    setActivateLoading(true);
    const status = await updateAutomationActiveStatus(
      automation.pipeline_id,
      automation.id,
      !automation.active,
    );
    setActivateLoading(false);
    if (status.success) {
      pipelineAutomationsDispatch({
        type: UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
        payload: {
          id: automation.id,
          active: !automation.active,
        },
      });
    }
  };

  const handleDelete = async () => {
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
    <WPQTDropdown
      menuBtn={({ active }) => (
        <WPQTDropdownIcon
          isActive={active}
          IconComponent={EllipsisHorizontalIcon}
        />
      )}
    >
      <WPQTDropdownItem
        text={
          automation.active
            ? __("Deactivate", "quicktasker")
            : __("Activate", "quicktasker")
        }
        icon={
          automation.active ? (
            <PauseCircleIcon className="wpqt-icon-gray wpqt-size-5" />
          ) : (
            <PlayCircleIcon className="wpqt-icon-green wpqt-size-5" />
          )
        }
        loading={activateLoading}
        onClick={handleToggleActive}
      />
      <WPQTDropdownItem
        text={__("View logs", "quicktasker")}
        icon={<TbLogs className="wpqt-icon-blue wpqt-size-5" />}
        onClick={() =>
          modalDispatch({
            type: OPEN_AUTOMATION_LOGS_MODAL,
            payload: { automationId: automation.id },
          })
        }
      />
      <WPQTConfirmTooltip
        onConfirm={handleDelete}
        confirmMessage={__(
          "Are you sure you want to delete this automation?",
          "quicktasker",
        )}
        confirmButtonText={__("Delete", "quicktasker")}
      >
        {({ onClick }) => (
          <WPQTDropdownItem
            text={__("Delete automation", "quicktasker")}
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
            loading={deleteLoading}
            onClick={onClick}
          />
        )}
      </WPQTConfirmTooltip>
    </WPQTDropdown>
  );
}

export { PipelineAutomation };
