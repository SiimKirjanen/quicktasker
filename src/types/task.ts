import { ServerUser, User } from "./user";

type BaseTask = {
  id: string;
  pipeline_id: string;
  stage_id: string;
  name: string;
  description: string;
};

type Task = BaseTask & {
  task_order: number;
  free_for_all: boolean;
  assigned_users: User[];
};

type TaskFromServer = BaseTask & {
  task_order: string;
  free_for_all: string;
  assigned_users: ServerUser[];
};

type BaseArchivedTask = Omit<BaseTask, "stage_id">;

type ArchivedTask = BaseArchivedTask;

type ArchivedTaskFromServer = BaseArchivedTask;

export type { Task, TaskFromServer, ArchivedTaskFromServer, ArchivedTask };
