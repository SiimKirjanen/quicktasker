import { Task } from "./task";

type BaseStage = {
  id: string;
  pipeline_id: string;
  name: string;
  description: string;
  tasks?: Task[];
};

type Stage = BaseStage & {
  stage_order: number;
};

type StageFromServer = BaseStage & {
  stage_order: string;
};

type StageChangeDirection = "left" | "right";

export { type Stage, type StageChangeDirection, type StageFromServer };
