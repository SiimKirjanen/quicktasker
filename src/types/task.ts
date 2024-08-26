type BaseTask = {
  id: string;
  stage_id: string;
  name: string;
  description: string;
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
