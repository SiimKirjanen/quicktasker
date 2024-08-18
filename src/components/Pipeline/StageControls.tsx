import { deleteStageRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { OPEN_STAGE_EDIT_MODAL, PIPELINE_DELETE_STAGE } from "../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog8ToothIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { ModalContext } from "../../providers/ModalContextProvider";
import { Stage } from "../../types/stage";

type Props = {
  stage: Stage;
};

function StageControls({ stage }: Props) {
  const { dispatch } = useContext(PipelineContext);
  const { modalDispatch } = useContext(ModalContext);

  const deleteStage = async () => {
    try {
      await deleteStageRequest(stage.id);

      dispatch({ type: PIPELINE_DELETE_STAGE, payload: stage.id });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete stage", {
        position: "bottom-right",
      });
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
            className="wpqt-flex wpqt-cursor-pointer wpqt-items-center"
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
