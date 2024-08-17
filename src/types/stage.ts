import { Task } from "./task";

type Stage = {
  id: string;
  pipelineId: string;
  name: string;
  description: string;
  tasks: Task[];
};

export type { Stage };
