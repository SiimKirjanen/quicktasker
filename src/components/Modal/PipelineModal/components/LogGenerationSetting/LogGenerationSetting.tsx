import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSettingActions } from "../../../../../hooks/actions/useSettingActions";
import { PipelineSettings } from "../../../../../types/pipeline-settings";
import { Toggle } from "../../../../common/Toggle/Toggle";
import { LoadingOval } from "../../../../Loading/Loading";
import { Settings } from "../Setting/Settings";

type Props = {
  pipelineId: string;
  enableAutomationLogs: boolean;
  enableWebhookLogs: boolean;
  enableApiTokenLogs: boolean;
};

type Source = "automation" | "webhook" | "api_token";

function LogGenerationSetting({
  pipelineId,
  enableAutomationLogs,
  enableWebhookLogs,
  enableApiTokenLogs,
}: Props) {
  const [enabled, setEnabled] = useState({
    automation: enableAutomationLogs,
    webhook: enableWebhookLogs,
    api_token: enableApiTokenLogs,
  });
  const [saving, setSaving] = useState<Source | null>(null);
  const { savePipelineSettings } = useSettingActions();

  const settingKey: Record<Source, keyof PipelineSettings> = {
    automation: "enable_automation_logs",
    webhook: "enable_webhook_logs",
    api_token: "enable_api_token_logs",
  };

  const onToggle = (source: Source) => async (checked: boolean) => {
    setEnabled((prev) => ({ ...prev, [source]: checked }));
    setSaving(source);
    const { success } = await savePipelineSettings(pipelineId, {
      [settingKey[source]]: checked,
    });
    setSaving(null);

    if (!success) {
      setEnabled((prev) => ({ ...prev, [source]: !checked }));
    }
  };

  const row = (source: Source, label: string, testId: string): JSX.Element => (
    <div className="wpqt-flex wpqt-gap-2 wpqt-items-center wpqt-mb-2">
      <Toggle
        checked={enabled[source]}
        handleChange={onToggle(source)}
        dataTestId={testId}
      />
      <span>{label}</span>
      {saving === source && <LoadingOval width="20" height="20" />}
    </div>
  );

  return (
    <Settings
      title={__("Log generation", "quicktasker")}
      description={__(
        "Choose which sources may write entries to this board's activity log. Disable a source to stop it from generating logs when it produces too much noise.",
        "quicktasker",
      )}
    >
      {row(
        "automation",
        __("Automation logs", "quicktasker"),
        "enable-automation-logs-toggle",
      )}
      {row(
        "webhook",
        __("Webhook logs", "quicktasker"),
        "enable-webhook-logs-toggle",
      )}
      {row(
        "api_token",
        __("API token logs", "quicktasker"),
        "enable-api-token-logs-toggle",
      )}
    </Settings>
  );
}

export { LogGenerationSetting };
