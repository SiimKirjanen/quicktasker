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
