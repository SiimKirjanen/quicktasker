import { Stage } from "./stage";

type BasePipeline = {
  id: string;
  name: string;
  description?: string;
  stages?: Stage[];
};

type Pipeline = BasePipeline & {
  is_primary: boolean;
};

type PipelineFromServer = BasePipeline & {
  is_primary: string;
};

export type { Pipeline, PipelineFromServer };
