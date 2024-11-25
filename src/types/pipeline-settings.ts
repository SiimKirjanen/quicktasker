type BasePipelineSettings = {
  id: string;
  pipeline_id: string;
};

type PipelineSettings = BasePipelineSettings & {
  allow_only_last_stage_task_done: boolean;
};

type PipelineSettingsFromServer = BasePipelineSettings & {
  allow_only_last_stage_task_done: string;
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
