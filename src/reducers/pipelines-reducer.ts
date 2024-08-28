import {
  PIPELINE_ADD_PIPELINE,
  PIPELINE_EDIT_PIPELINE,
  PIPELINE_SET_PRIMARY,
  PIPELINES_SET,
} from "../constants";
import { Action, State } from "../providers/PipelinesContextProvider";
import { Pipeline, PipelineFromServer } from "../types/pipeline";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case PIPELINES_SET: {
      const pipelines: PipelineFromServer[] = action.payload;

      return {
        ...state,
        pipelines: pipelines.map((pipeline) => {
          return {
            ...pipeline,
            is_primary: pipeline.is_primary === "1",
          };
        }),
      };
    }
    case PIPELINE_ADD_PIPELINE: {
      const pipeline: PipelineFromServer = action.payload;

      return {
        ...state,
        pipelines: [...state.pipelines, { ...pipeline, is_primary: false }],
      };
    }
    case PIPELINE_SET_PRIMARY: {
      const primaryPipelineId: string = action.payload;

      return {
        ...state,
        pipelines: state.pipelines.map((pipeline) => ({
          ...pipeline,
          is_primary: pipeline.id === primaryPipelineId,
        })),
      };
    }
    case PIPELINE_EDIT_PIPELINE: {
      const pipeline: Pipeline = action.payload;

      return {
        ...state,
        pipelines: state.pipelines.map((p) =>
          p.id === pipeline.id ? pipeline : p,
        ),
      };
    }
    default:
      return state;
  }
};

export { reducer };
