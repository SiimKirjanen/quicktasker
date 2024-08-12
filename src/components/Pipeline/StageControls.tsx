import { deleteStageRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PIPELINE_DELETE_STAGE } from "../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog8ToothIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  stageId: string;
};

function StageControls({ stageId }: Props) {
  const { dispatch } = useContext(PipelineContext);

  const deleteStage = async () => {
    try {
      await deleteStageRequest(stageId);

      dispatch({ type: PIPELINE_DELETE_STAGE, payload: stageId });
    } catch (error) {
      console.error(error);
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
        className="wpqt-p-4 wpqt-bg-white wpqt-rounded-xl wpqt-border wpqt-origin-top wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        <MenuItem>
          <button
            className="wpqt-strip-btn wpqt-flex wpqt-items-center wpqt-cursor-pointer"
            onClick={deleteStage}
          >
            <TrashIcon className="wpqt-size-4 wpqt-text-red-600" />
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export { StageControls };
