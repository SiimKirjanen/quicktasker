import { ServerUser, User } from "./user";

type BaseTask = {
  id: string;
  pipeline_id: string;
  stage_id: string;
  name: string;
  description: string;
  task_hash: string;
  created_at: string;
};

type Task = BaseTask & {
  task_order: number;
  free_for_all: boolean;
  assigned_users: User[];
  is_archived: boolean;
};

type TaskFromServer = BaseTask & {
  task_order: string;
  free_for_all: string;
  assigned_users: ServerUser[];
  is_archived: string;
};

export type { Task, TaskFromServer };
