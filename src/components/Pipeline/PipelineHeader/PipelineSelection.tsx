import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../../providers/PipelineContextProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { getPipelineData } from "../../../api/api";
import { toast } from "react-toastify";
import {
  OPEN_NEW_PIPELINE_MODAL,
  PIPELINE_SET_PIPELINE,
} from "../../../constants";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "../../../providers/ModalContextProvider";

function PipelineSelection() {
  const {
    state: { existingPipelines, activePipeline },
    dispatch,
  } = useContext(PipelineContext);
  const { modalDispatch } = useContext(ModalContext);

  const changePipeline = async (pipelineId: string) => {
    try {
      const response = await getPipelineData(pipelineId);

      dispatch({
        type: PIPELINE_SET_PIPELINE,
        payload: response.data,
      });
    } catch (e) {
      toast.error("Failed to change pipeline");
    }
  };

  const openPipelineModal = async () => {
    modalDispatch({
      type: OPEN_NEW_PIPELINE_MODAL,
    });
  };

  return (
    <Menu>
      <MenuButton
        as="div"
        className="wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1 wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-2"
      >
        <div className="wpqt-leading-none">{activePipeline?.name}</div>
        <ChevronDownIcon className="wpqt-size-4" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="wpqt-z-20 wpqt-mt-3 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        <div className="wpqt-mb-4 wpqt-text-center wpqt-font-bold">
          Change board
        </div>
        {existingPipelines.map((existingPipeline) => {
          return (
            <MenuItem key={existingPipeline.id}>
              <div
                className="wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-justify-center"
                onClick={() => changePipeline(existingPipeline.id)}
              >
                {existingPipeline.name}
              </div>
            </MenuItem>
          );
        })}
        <MenuItem key="new-pipeline">
          <div
            className="wpqt-mt-4 wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-2"
            onClick={openPipelineModal}
          >
            <div>Add new board</div>
            <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export { PipelineSelection };
