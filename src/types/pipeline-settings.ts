type BasePipelineSettings = {
  id: string;
  pipeline_id: string;
};

type PipelineSettings = BasePipelineSettings & {
  allow_only_last_stage_task_done: boolean;
  pipeline_refresh_interval: number;
  allow_public_task_creation: boolean;
  public_task_creation_limit: number;
  public_task_creation_count: number;
  require_logged_in_user: boolean;
};

type PipelineSettingsFromServer = BasePipelineSettings & {
  allow_only_last_stage_task_done: string;
  pipeline_refresh_interval: string;
  allow_public_task_creation: string;
  public_task_creation_limit: string;
  public_task_creation_count: string;
  require_logged_in_user: string;
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
