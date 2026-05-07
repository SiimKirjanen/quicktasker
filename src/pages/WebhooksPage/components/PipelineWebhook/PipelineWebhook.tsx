import {
  EllipsisHorizontalIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TbLogs } from "react-icons/tb";
import { toast } from "react-toastify";

import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { WPQTConfirmTooltip } from "../../../../components/Dialog/ConfirmTooltip/ConfirmTooltip";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../../../../components/Dropdown/WPQTDropdown";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import {
  EDIT_PIPELINE_WEBHOOK,
  OPEN_WEBHOOKS_LOGS_MODAL,
  REMOVE_PIPELINE_WEBHOOK,
} from "../../../../constants";
import { useWebhookActions } from "../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../hooks/useWebhooks";
import { AppContext } from "../../../../providers/AppContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Webhook, WebhookTargetAction } from "../../../../types/webhook";
import { convertToTimezone } from "../../../../utils/timezone";

type Props = {
  webhook: Webhook;
};

const actionChipClasses: Record<string, string> = {
  created: "wpqt-bg-green-100 wpqt-text-green-800",
  updated: "wpqt-bg-amber-100 wpqt-text-amber-800",
  deleted: "wpqt-bg-red-100 wpqt-text-red-800",
  archived: "wpqt-bg-red-100 wpqt-text-red-800",
  "restored-archived": "wpqt-bg-blue-100 wpqt-text-blue-800",
  completed: "wpqt-bg-green-100 wpqt-text-green-800",
  "not-completed": "wpqt-bg-gray-100 wpqt-text-gray-800",
  "stage-changed": "wpqt-bg-blue-100 wpqt-text-blue-800",
  assigned: "wpqt-bg-blue-100 wpqt-text-blue-800",
  unassigned: "wpqt-bg-gray-100 wpqt-text-gray-800",
  "comment-added": "wpqt-bg-blue-100 wpqt-text-blue-800",
  "label-added": "wpqt-bg-blue-100 wpqt-text-blue-800",
  "label-removed": "wpqt-bg-gray-100 wpqt-text-gray-800",
  "file-added": "wpqt-bg-blue-100 wpqt-text-blue-800",
  "file-removed": "wpqt-bg-gray-100 wpqt-text-gray-800",
};

function PipelineWebhook({ webhook }: Props) {
  const {
    state: { timezone },
  } = useContext(AppContext);
  const { editWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleConfirmChange = async (newValue: boolean) => {
    setConfirmLoading(true);
    const { success } = await editWebhook(webhook.id, {
      webhook_confirm: newValue,
    });
    setConfirmLoading(false);
    if (success) {
      toast.success(__("Webhook updated", "quicktasker"));
      pipelineWebhooksDispatch({
        type: EDIT_PIPELINE_WEBHOOK,
        payload: {
          webhookId: webhook.id,
          webhookData: { webhook_confirm: newValue },
        },
      });
    }
  };

  return (
    <WPQTCard
      title={`${webhook.target_type}.${webhook.target_action}`}
      titleClassName="wpqt-font-mono wpqt-text-base"
      dropdown={<WebhookDropdown webhook={webhook} />}
      dataTestId="pipeline-webhook"
      className="wpqt-w-full wpqt-h-full"
    >
      <WPQTCardDataItem
        label={__("Event", "quicktasker")}
        value={
          <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-1">
            <span className="wpqt-inline-flex wpqt-items-center wpqt-rounded wpqt-bg-gray-100 wpqt-text-gray-800 wpqt-px-2 wpqt-py-0.5 wpqt-text-xs wpqt-font-mono wpqt-font-semibold">
              {webhook.target_type}
            </span>
            <span
              className={`wpqt-inline-flex wpqt-items-center wpqt-rounded wpqt-px-2 wpqt-py-0.5 wpqt-text-xs wpqt-font-mono wpqt-font-semibold ${
                actionChipClasses[webhook.target_action] ??
                "wpqt-bg-gray-100 wpqt-text-gray-800"
              }`}
            >
              {webhook.target_action}
            </span>
          </div>
        }
      />
      <WPQTCardDataItem
        label={__("URL", "quicktasker")}
        value={
          <span className="wpqt-break-all wpqt-font-mono wpqt-text-sm">
            {webhook.webhook_url}
          </span>
        }
      />
      <WPQTCardDataItem
        label={__("Status", "quicktasker")}
        value={
          webhook.active ? (
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
        label={__("Wait for response", "quicktasker")}
        value={
          <WPQTConfirmTooltip
            onConfirm={() => handleConfirmChange(true)}
            confirmMessage={__(
              "Wait for response is intended for development and debugging only. Leaving this on in production will severely slow down board actions. Enable anyway?",
              "quicktasker",
            )}
            confirmButtonText={__("Enable", "quicktasker")}
            position="top"
          >
            {({ onClick }) => (
              <Toggle
                checked={webhook.webhook_confirm}
                disabled={confirmLoading}
                handleChange={(newValue) => {
                  if (newValue) {
                    onClick({
                      stopPropagation: () => {},
                      preventDefault: () => {},
                    } as React.MouseEvent);
                  } else {
                    handleConfirmChange(false);
                  }
                }}
              />
            )}
          </WPQTConfirmTooltip>
        }
      />
      <WPQTCardDataItem
        label={__("Created", "quicktasker")}
        value={convertToTimezone(webhook.created_at, timezone)}
      />
    </WPQTCard>
  );
}

function WebhookDropdown({ webhook }: { webhook: Webhook }) {
  const { editWebhook, deleteWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const { modalDispatch } = useContext(ModalContext);
  const [activateLoading, setActivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleToggleActive = async () => {
    setActivateLoading(true);
    const { success } = await editWebhook(webhook.id, {
      active: !webhook.active,
    });
    setActivateLoading(false);
    if (success) {
      pipelineWebhooksDispatch({
        type: EDIT_PIPELINE_WEBHOOK,
        payload: {
          webhookId: webhook.id,
          webhookData: { active: !webhook.active },
        },
      });
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const { success } = await deleteWebhook(webhook.id);
    setDeleteLoading(false);
    if (success) {
      pipelineWebhooksDispatch({
        type: REMOVE_PIPELINE_WEBHOOK,
        payload: { webhookId: webhook.id },
      });
    }
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
          webhook.active
            ? __("Deactivate", "quicktasker")
            : __("Activate", "quicktasker")
        }
        icon={
          webhook.active ? (
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
            type: OPEN_WEBHOOKS_LOGS_MODAL,
            payload: { webhookId: webhook.id },
          })
        }
      />
      <WPQTConfirmTooltip
        onConfirm={handleDelete}
        confirmMessage={__(
          "Are you sure you want to delete this webhook?",
          "quicktasker",
        )}
        confirmButtonText={__("Delete", "quicktasker")}
      >
        {({ onClick }) => (
          <WPQTDropdownItem
            text={__("Delete webhook", "quicktasker")}
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
            loading={deleteLoading}
            onClick={onClick}
          />
        )}
      </WPQTConfirmTooltip>
    </WPQTDropdown>
  );
}

export { PipelineWebhook, WebhookTargetAction };
