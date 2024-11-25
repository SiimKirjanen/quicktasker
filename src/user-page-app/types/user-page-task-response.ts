import { CustomField } from "../../types/custom-field";
import { PublicPipelineSettingsFromServer } from "../../types/pipeline-settings";
import { StageFromServer } from "../../types/stage";
import { TaskFromServer } from "../../types/task";

type UserPageTaskResponse = {
  task: TaskFromServer;
  stages: StageFromServer[];
  customFields: CustomField[];
  pipelineSettings: PublicPipelineSettingsFromServer;
};

export type { UserPageTaskResponse };
