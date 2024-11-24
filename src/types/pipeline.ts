import {
  PipelineSettings,
  PipelineSettingsFromServer,
} from "./pipeline-settings";
import { Stage, StageFromServer } from "./stage";

type BasePipeline = {
  id: string;
  name: string;
  description?: string;
};

type Pipeline = BasePipeline & {
  is_primary: boolean;
  stages?: Stage[];
  settings?: PipelineSettings;
};

type PipelineFromServer = BasePipeline & {
  is_primary: string;
  stages?: StageFromServer[];
  settings?: PipelineSettingsFromServer;
};

type FullPipelineDataFromServer = {
  pipeline: PipelineFromServer;
  pipelines: PipelineFromServer[];
};

export type { FullPipelineDataFromServer, Pipeline, PipelineFromServer };
