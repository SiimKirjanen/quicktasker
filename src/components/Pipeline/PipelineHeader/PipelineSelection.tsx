import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../../providers/PipelineContextProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { setPipelinePrimaryRequest } from "../../../api/api";
import { toast } from "react-toastify";
import {
  OPEN_NEW_PIPELINE_MODAL,
  PIPELINE_SET_PRIMARY,
} from "../../../constants";
import {
  ChevronDownIcon,
  PlusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Pipeline } from "../../../types/pipeline";
import { clsx } from "clsx";

function PipelineSelection() {
  const {
    state: { existingPipelines, activePipeline },
    dispatch,
    fetchAndSetPipelineData,
  } = useContext(PipelineContext);
  const { modalDispatch } = useContext(ModalContext);

  const changePipelinePrimary = async (pipeline: Pipeline) => {
    try {
      await setPipelinePrimaryRequest(pipeline.id);

      dispatch({
        type: PIPELINE_SET_PRIMARY,
        payload: pipeline.id,
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to set primary board");
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
          const isPrimary = existingPipeline.is_primary;
          const isCurrentPipeline = activePipeline?.id === existingPipeline.id;

          return (
            <MenuItem key={existingPipeline.id}>
              <div className="wpqt-mb-3 wpqt-flex">
                <div
                  className={clsx("wpqt-cursor-pointer wpqt-text-center", {
                    "wpqt-font-bold": isCurrentPipeline,
                  })}
                  onClick={() => fetchAndSetPipelineData(existingPipeline.id)}
                >
                  {existingPipeline.name}
                </div>
                <div className="wpqt-ml-auto">
                  {isPrimary ? (
                    <StarIcon className="wpqt-size-4 wpqt-cursor-pointer wpqt-text-blue-500" />
                  ) : (
                    <StarIconOutline
                      className="wpqt-size-4 wpqt-cursor-pointer wpqt-text-gray-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        changePipelinePrimary(existingPipeline);
                      }}
                    />
                  )}
                </div>
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
