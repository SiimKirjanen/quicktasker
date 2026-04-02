type BasePipelineSettings = {
  id: string;
  pipeline_id: string;
};

type PipelineSettings = BasePipelineSettings & {
  allow_only_last_stage_task_done: boolean;
  pipeline_refresh_interval: number;
};

type PipelineSettingsFromServer = BasePipelineSettings & {
  allow_only_last_stage_task_done: string;
  pipeline_refresh_interval: string;
};

type PublicPipelineSettings = {
  allow_only_last_stage_task_done: boolean;
};

type PublicPipelineSettingsFromServer = {
  allow_only_last_stage_task_done: string;
};

export type {
  PipelineSettings,
  PipelineSettingsFromServer,
  PublicPipelineSettings,
  PublicPipelineSettingsFromServer,
};
