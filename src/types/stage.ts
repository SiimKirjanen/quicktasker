import { Task } from "./task";

type Stage = {
  id: string;
  pipeline_id: string;
  name: string;
  description: string;
  tasks: Task[];
};

export type { Stage };
