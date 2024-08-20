import { Task } from "./task";

type Stage = {
  id: string;
  pipeline_id: string;
  name: string;
  description: string;
  stage_order: number;
  tasks: Task[];
};

type StageChangeDirection = "left" | "right";

export type { Stage, StageChangeDirection };
