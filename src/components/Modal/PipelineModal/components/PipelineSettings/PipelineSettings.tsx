import { useEffect, useState } from "@wordpress/element";

import { getPipelineSettingsRequest } from "../../../../../api/api";
import { Pipeline } from "../../../../../types/pipeline";
import { PipelineSettings } from "../../../../../types/pipeline-settings";
import { convertPipelineSettingsFromServer } from "../../../../../utils/pipeline-settings";
import { Loading } from "../../../../Loading/Loading";
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
    </div>
  );
}

export { PipelineSettings };
