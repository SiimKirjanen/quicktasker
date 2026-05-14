export type BoardStatus = {
  enabled?: boolean;
  limit_reached?: boolean;
  requires_login?: boolean;
  login_required?: boolean;
};

export type TaskStatusData = {
  name: string;
  description?: string;
  is_done: boolean;
  stage_name?: string;
};

export type StatusEntry =
  | { ok: true; data: TaskStatusData }
  | { ok: false; gone?: boolean; error?: string };

export type CreateTaskResponse = { task_hash?: string };

export type WPQTResponse<T> = {
  success: boolean;
  data?: T;
  errors?: string[];
};
