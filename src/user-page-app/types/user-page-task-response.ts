import { StageFromServer } from "../../types/stage";
import { TaskFromServer } from "../../types/task";

type UserPageTaskResponse = {
  task: TaskFromServer;
  stages: StageFromServer[];
};

export type { UserPageTaskResponse };
