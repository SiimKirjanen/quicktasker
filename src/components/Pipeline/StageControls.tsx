import { deleteStageRequest, moveStageRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import {
  OPEN_STAGE_EDIT_MODAL,
  PIPELINE_DELETE_STAGE,
  PIPELINE_MOVE_STAGE,
} from "../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Cog8ToothIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { ModalContext } from "../../providers/ModalContextProvider";
import { Stage, StageChangeDirection } from "../../types/stage";

type Props = {
  stage: Stage;
};

function StageControls({ stage }: Props) {
  const {
    dispatch,
    state: { activePipeline },
  } = useContext(PipelineContext);
  const { modalDispatch } = useContext(ModalContext);
  const stagesLength = activePipeline?.stages?.length ?? 0;
  const stageOrder = +stage.stage_order;
  const showMoveLeft = stageOrder !== 0 && stageOrder < stagesLength;
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
      const resp = await moveStageRequest(stage.id, direction);
      const sourceIndex = stage.stage_order;
      const destinationIndex = resp.data.stage_order;

      dispatch({
        type: PIPELINE_MOVE_STAGE,
        payload: {
          sourceIndex,
          destinationIndex,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to move a stage");
    }
  };

  return (
    <Menu>
      <MenuButton className="wpqt-strip-btn wpqt-cursor-pointer">
        <Cog8ToothIcon className="wpqt-size-5 wpqt-text-gray-400" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        transition
        className="wpqt-z-20 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        {showMoveLeft && (
          <MenuItem>
            <div
              className="wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-items-center"
              onClick={() => moveStage("left")}
            >
              <ArrowLeftIcon className="wpqt-size-4 wpqt-text-red-600" />
              Move left
            </div>
          </MenuItem>
        )}

        {showMoveRight && (
          <MenuItem>
            <div
              className="wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-items-center"
              onClick={() => moveStage("right")}
            >
              <ArrowRightIcon className="wpqt-size-4 wpqt-text-red-600" />
              Move right
            </div>
          </MenuItem>
        )}

        <MenuItem>
          <div
            className="wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-items-center"
            onClick={openStageEditModal}
          >
            <TrashIcon className="wpqt-size-4 wpqt-text-red-600" />
            Edit stage
          </div>
        </MenuItem>

        <MenuItem>
          <div
            className="wpqt-mt-5 wpqt-flex wpqt-cursor-pointer wpqt-items-center"
            onClick={deleteStage}
          >
            <TrashIcon className="wpqt-size-4 wpqt-text-red-600" />
            Delete stage
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export { StageControls };
