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

export type { Task, TaskFromServer };
