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
