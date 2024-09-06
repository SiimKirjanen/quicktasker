import { User } from "./user";

type BaseTask = {
  id: string;
  pipeline_id: string;
  stage_id: string;
  name: string;
  description: string;
  assigned_users: User[];
};

type Task = BaseTask & {
  task_order: number;
};

type TaskFromServer = BaseTask & {
  task_order: string;
};

type BaseArchivedTask = Omit<BaseTask, "stage_id">;

type ArchivedTask = BaseArchivedTask;

type ArchivedTaskFromServer = BaseArchivedTask;

export type { Task, TaskFromServer, ArchivedTaskFromServer, ArchivedTask };
