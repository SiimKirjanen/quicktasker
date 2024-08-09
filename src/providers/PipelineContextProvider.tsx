import { createContext, useReducer } from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import { moveTask, reorderTask } from "../utils/list";
import {
  PIPELINE_SET_LOADING,
  PIPELINE_MOVE_TASK,
  PIPELINE_REORDER_TASK,
  PIPELINE_SET_PIPELINE,
} from "../constants";

const initialState = {
  loading: true,
  pipeline: null,
};

type State = {
  loading: boolean;
  pipeline: Pipeline | null;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type PipelineContextType = {
  state: State;
  dispatch: Dispatch;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case PIPELINE_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PIPELINE_SET_PIPELINE:
      return {
        ...state,
        pipeline: action.payload,
      };
    case PIPELINE_MOVE_TASK:
      const stages = moveTask(
        state.pipeline!.stages,
        action.payload.source,
        action.payload.destination
      );

      return {
        ...state,
        pipeline: {
          ...state.pipeline!,
          stages,
        },
      };
    case PIPELINE_REORDER_TASK:
      const { source, destination } = action.payload;
      const targetStageId = destination.droppableId;
      const targetIndex = destination.index;

      const targetStage = state.pipeline?.stages.find(
        (stage) => stage.id === targetStageId
      );

      const reorderedTasks = reorderTask(
        targetStage!.tasks,
        source.index,
        targetIndex
      );

      const updatedStages = state.pipeline!.stages.map((stage) =>
        stage.id === targetStageId ? { ...stage, tasks: reorderedTasks } : stage
      );

      return {
        ...state,
        pipeline: {
          ...state.pipeline!,
          stages: updatedStages,
        },
      };
    default:
      return state;
  }
};

const PipelineContext = createContext<PipelineContextType>({
  state: initialState,
  dispatch: () => {},
});

const PipelineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PipelineContext.Provider value={{ state, dispatch }}>
      {children}
    </PipelineContext.Provider>
  );
};

export { PipelineContextProvider, PipelineContext };
