type BaseApiToken = {
  id: string;
  pipeline_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  // The WordPress user who created the token. Unknown for tokens created before it was saved.
  created_by: string | null;
  // Null when the user has been deleted.
  created_by_name: string | null;
  // Whether the creator can still use the board. The token only works while they can.
  created_by_has_board_access?: boolean | null;
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

type NewApiToken = Omit<
  ApiToken,
  | "id"
  | "created_at"
  | "updated_at"
  | "created_by"
  | "created_by_name"
  | "created_by_has_board_access"
>;

export type { ApiToken, ApiTokenFromServer, NewApiToken };
