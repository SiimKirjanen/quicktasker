import { REFETCH_ACTIVE_PIPELINE_INTERVAL } from "../constants";
import {
  PipelineSettings,
  PipelineSettingsFromServer,
  PublicPipelineSettings,
  PublicPipelineSettingsFromServer,
} from "../types/pipeline-settings";

const convertPipelineSettingsFromServer = (
  pipelineSettings: PipelineSettingsFromServer,
): PipelineSettings => {
  return {
    ...pipelineSettings,
    allow_only_last_stage_task_done:
      pipelineSettings.allow_only_last_stage_task_done === "1",
    pipeline_refresh_interval: (() => {
      const seconds = parseInt(pipelineSettings.pipeline_refresh_interval, 10);

      if (isNaN(seconds) || seconds <= 0) {
        return REFETCH_ACTIVE_PIPELINE_INTERVAL;
      }
      return seconds;
    })(),
    allow_public_task_creation:
      pipelineSettings.allow_public_task_creation === "1",
    public_task_creation_limit:
      parseInt(pipelineSettings.public_task_creation_limit, 10) || 0,
    public_task_creation_count:
      parseInt(pipelineSettings.public_task_creation_count, 10) || 0,
  };
};

const convertPublicPipelineSettingsFromServer = (
  pipelineSettings: PublicPipelineSettingsFromServer,
): PublicPipelineSettings => {
  return {
    ...pipelineSettings,
    allow_only_last_stage_task_done:
      pipelineSettings.allow_only_last_stage_task_done === "1",
  };
};

export {
  convertPipelineSettingsFromServer,
  convertPublicPipelineSettingsFromServer,
};
