import {
  archiveStageTasksRequest,
  deleteStageRequest,
  moveStageRequest,
} from "../../../api/api";
import { useContext } from "@wordpress/element";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import {
  OPEN_STAGE_EDIT_MODAL,
  PIPELINE_DELETE_STAGE,
} from "../../../constants";
import {
  Cog8ToothIcon,
  ArchiveBoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Stage, StageChangeDirection } from "../../../types/stage";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

type Props = {
  stage: Stage;
};

function StageControlsDropdown({ stage }: Props) {
  const {
    dispatch,
    state: { activePipeline },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const { modalDispatch } = useContext(ModalContext);
  const stagesLength = activePipeline?.stages?.length ?? 0;
  const stageOrder = +stage.stage_order;
  const showMoveLeft = stageOrder > 0 && stageOrder < stagesLength;
  const showMoveRight = stageOrder !== stagesLength - 1;

  const deleteStage = async () => {
    try {
      await deleteStageRequest(stage.id);

      dispatch({ type: PIPELINE_DELETE_STAGE, payload: stage.id });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete a stage");
    }
  };

  const openStageEditModal = () => {
    modalDispatch({
      type: OPEN_STAGE_EDIT_MODAL,
      payload: {
        stageToEdit: stage,
      },
    });
  };

  const moveStage = async (direction: StageChangeDirection) => {
    try {
      await moveStageRequest(stage.id, direction);
      fetchAndSetPipelineData(activePipeline!.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to move a stage");
    }
  };

  const archiveAllStageTasks = async () => {
    try {
      await archiveStageTasksRequest(stage.id);
      fetchAndSetPipelineData(activePipeline!.id);
      toast.success(`Archived all ${stage.name} tasks`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to archive stage ${stage.name} tasks`);
    }
  };

  return (
    <WPQTDropdown
      menuBtn={({ active }) => (
        <WPQTDropdownIcon isActive={active} IconComponent={Cog8ToothIcon} />
      )}
    >
      {showMoveLeft && (
        <WPQTDropdownItem
          text="Move left"
          icon={<ChevronLeftIcon className="wpqt-icon-blue wpqt-size-4" />}
          onClick={() => moveStage("left")}
        />
      )}

      {showMoveRight && (
        <WPQTDropdownItem
          text="Move right"
          icon={<ChevronRightIcon className="wpqt-icon-blue wpqt-size-4" />}
          onClick={() => moveStage("right")}
        />
      )}
      <WPQTDropdownItem
        text="Edit stage"
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={openStageEditModal}
      />
      <WPQTDropdownItem
        text="Archive all stage tasks"
        icon={<ArchiveBoxIcon className="wpqt-icon-blue wpqt-size-4" />}
        onClick={archiveAllStageTasks}
      />

      <WPQTDropdownItem
        text="Delete stage"
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        onClick={deleteStage}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { StageControlsDropdown };
