type BaseApiToken = {
  id: string;
  pipeline_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  token?: string;
};

type ApiToken = BaseApiToken & {
  get_pipeline: boolean;
  patch_pipeline: boolean;
  get_pipeline_stages: boolean;
  post_pipeline_stages: boolean;
  patch_pipeline_stages: boolean;
  delete_pipeline_stages: boolean;
  get_pipeline_tasks: boolean;
  post_pipeline_tasks: boolean;
  patch_pipeline_tasks: boolean;
  delete_pipeline_tasks: boolean;
};

type ApiTokenFromServer = BaseApiToken & {
  get_pipeline: string;
  patch_pipeline: string;
  get_pipeline_stages: string;
  post_pipeline_stages: string;
  patch_pipeline_stages: string;
  delete_pipeline_stages: string;
  get_pipeline_tasks: string;
  post_pipeline_tasks: string;
  patch_pipeline_tasks: string;
  delete_pipeline_tasks: string;
};

type NewApiToken = Omit<ApiToken, "id" | "created_at" | "updated_at">;

export type { ApiToken, ApiTokenFromServer, NewApiToken };
