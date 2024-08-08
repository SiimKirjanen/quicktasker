import { createContext, useReducer } from "@wordpress/element";
import { Pipeline } from "../types/pipeline";
import { moveTask, reorderTask } from "../utils/list";

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
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_PIPELINE":
      return {
        ...state,
        pipeline: action.payload,
      };
    case "MOVE_TASK":
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
    case "REORDER_TASK":
      const targetStage = state.pipeline?.stages.find(
        (stage) => stage.id === action.payload.destination.droppableId
      );
      const reorderedTasks = reorderTask(
        targetStage!.tasks,
        action.payload.source.index,
        action.payload.destination.index
      );

      return {
        ...state,
        stages: state.pipeline!.stages.map((stage) =>
          stage.id === action.payload.destination.destination.droppableId
            ? { ...stage, tasks: reorderedTasks }
            : stage
        ),
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
