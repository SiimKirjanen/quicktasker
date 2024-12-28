import { Label } from "./label";
import { ServerUser, User, WPUser } from "./user";

type BaseTask = {
  id: string;
  pipeline_id: string;
  pipeline_name: string | null;
  stage_id: string;
  name: string;
  description: string;
  task_hash: string;
  created_at: string;
  assigned_labels: Label[];
};

type Task = BaseTask & {
  task_order: number;
  free_for_all: boolean;
  assigned_users: User[];
  assigned_wp_users: WPUser[];
  is_archived: boolean;
  is_done: boolean;
};

type TaskFromServer = BaseTask & {
  task_order: string;
  free_for_all: string;
  assigned_users: ServerUser[];
  assigned_wp_users: WPUser[];
  is_archived: string;
  is_done: string;
};

export type { Task, TaskFromServer };
