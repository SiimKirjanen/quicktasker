import { useEffect, useState } from "@wordpress/element";

import { getPipelineSettingsRequest } from "../../../../../api/api";
import { Pipeline } from "../../../../../types/pipeline";
import { PipelineSettings } from "../../../../../types/pipeline-settings";
import { convertPipelineSettingsFromServer } from "../../../../../utils/pipeline-settings";
import { Loading } from "../../../../Loading/Loading";
import { LogGenerationSetting } from "../LogGenerationSetting/LogGenerationSetting";
import { PipelineRefreshIntervalSetting } from "../PipelineRefreshIntervalSetting/PipelineRefreshIntervalSetting";
import { PublicTaskSubmissionsSetting } from "../PublicTaskSubmissionsSetting/PublicTaskSubmissionsSetting";
import { TaskCompletionDoneSetting } from "../TaskCompletionDoneSetting/TaskCompletionDoneSetting";

type Props = {
  pipeline: Pipeline;
};

function PipelineSettings({ pipeline }: Props) {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<PipelineSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await getPipelineSettingsRequest(pipeline.id);
        setSettings(convertPipelineSettingsFromServer(response.data.settings));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  if (loading) {
    return <Loading ovalSize="36" />;
  }

  if (!settings) {
    return null;
  }

  return (
    <div>
      <TaskCompletionDoneSetting
        pipelineId={pipeline.id}
        allow_only_last_stage_task_done={
          settings.allow_only_last_stage_task_done
        }
      />
      <PipelineRefreshIntervalSetting
        pipelineId={pipeline.id}
        pipelineRefreshInterval={settings.pipeline_refresh_interval}
      />
      <PublicTaskSubmissionsSetting
        pipelineId={pipeline.id}
        allowPublicTaskCreation={settings.allow_public_task_creation}
        publicTaskCreationLimit={settings.public_task_creation_limit}
        publicTaskCreationCount={settings.public_task_creation_count}
        requireLoggedInUser={settings.require_logged_in_user}
      />
      <LogGenerationSetting
        pipelineId={pipeline.id}
        enableAutomationLogs={settings.enable_automation_logs}
        enableWebhookLogs={settings.enable_webhook_logs}
        enableApiTokenLogs={settings.enable_api_token_logs}
      />
    </div>
  );
}

export { PipelineSettings };
