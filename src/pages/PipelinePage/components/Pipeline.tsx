import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "@hello-pangea/dnd";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useContext, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { moveTaskRequest } from "../../../api/api";
import { WPQTIconButton } from "../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { Info } from "../../../components/Info/Info";
import { StageModal } from "../../../components/Modal/StageModal/StageModal";
import { TaskColorModal } from "../../../components/Modal/TaskColorModal/TaskColorModal";
import { TaskModal } from "../../../components/Modal/TaskModal/TaskModal";
import {
  OPEN_NEW_PIPELINE_MODAL,
  OPEN_PIPELINE_IMPORT_MODAL,
  PIPELINE_MOVE_TASK,
  REFETCH_ACTIVE_PIPELINE_INTERVAL,
} from "../../../constants";
import { useApp } from "../../../hooks/useApp";
import useTabVisibility from "../../../hooks/useTabVisibility";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Pipeline } from "../../../types/pipeline";
import { AddStage } from "./AddStage";
import { Stage } from "./Stage";

const Pipeline = () => {
  const {
    state: { activePipeline },
    dispatch,
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const { isTabVisible } = useTabVisibility();
  const { modalDispatch } = useContext(ModalContext);
  const {
    state: { isUserAllowedToManageSettings },
  } = useApp();

  useEffect(() => {
    const refetchDataInterval = setInterval(() => {
      if (activePipeline && isTabVisible) {
        fetchAndSetPipelineData(activePipeline.id);
      }
    }, REFETCH_ACTIVE_PIPELINE_INTERVAL);

    return () => clearInterval(refetchDataInterval);
  }, [activePipeline, isTabVisible]);

  const dispatchMove = (
    source: DraggableLocation,
    destination: DraggableLocation,
  ) => {
    if (source.droppableId === destination.droppableId) {
      dispatch({
        type: "REORDER_TASK",
        payload: {
          source,
          destination,
        },
      });
    } else {
      dispatch({
        type: PIPELINE_MOVE_TASK,
        payload: {
          source,
          destination,
        },
      });
    }
  };

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      dispatchMove(source, destination);

      try {
        await moveTaskRequest(
          draggableId,
          destination.droppableId,
          destination.index,
        );
      } catch (error) {
        console.error(error);
        dispatchMove(destination, source);
        toast.error(__("Failed to move a task", "quicktasker"));
      }
    },
    [activePipeline],
  );

  const deleteTaskCallback = () => {
    if (activePipeline) {
      fetchAndSetPipelineData(activePipeline.id);
    }
  };

  if (!activePipeline) {
    return (
      <Info
        infoDescription={__(
          "No boards found. Start by creating a board to organize and manage your tasks effectively.",
          "quicktasker",
        )}
      >
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-items-center">
          <WPQTIconButton
            text={__("Create a new board", "quicktasker")}
            icon={<PlusCircleIcon className="wpqt-size-6 wpqt-icon-green" />}
            onClick={() => {
              modalDispatch({
                type: OPEN_NEW_PIPELINE_MODAL,
              });
            }}
          />
          <span>{__("or", "quicktasker")}</span>
          <div
            className="wpqt-blue-text wpqt-blue-text-hover wpqt-cursor-pointer"
            onClick={() => {
              modalDispatch({ type: OPEN_PIPELINE_IMPORT_MODAL });
            }}
          >
            {__("Import an existing board", "quicktasker")}
          </div>
        </div>
      </Info>
    );
  }

  return (
    <div className="wpqt-pipeline-height wpqt-flex wpqt-gap-[24px] wpqt-overflow-x-auto wpqt-overflow-y-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        {activePipeline!.stages?.map((stage, index) => {
          const isLastStage = index === activePipeline!.stages!.length - 1;

          return (
            <Stage key={stage.id} stage={stage} isLastStage={isLastStage} />
          );
        })}
      </DragDropContext>
      {isUserAllowedToManageSettings && (
        <AddStage
          pipelineId={activePipeline.id}
          stagesLength={activePipeline!.stages?.length}
        />
      )}
      <TaskModal deleteTaskCallback={deleteTaskCallback} />
      <TaskColorModal />
      <StageModal />
    </div>
  );
};
export default Pipeline;
