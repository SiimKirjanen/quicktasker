import { useContext } from "@wordpress/element";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "../../providers/ModalContextProvider";
import { OPEN_NEW_STAGE_MODAL } from "../../constants";

type Props = { pipelineId: string };

function AddStage({ pipelineId }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  const openNewStageModal = async () => {
    console.log("herllo1!!");
    modalDispatch({
      type: OPEN_NEW_STAGE_MODAL,
      payload: {
        targetPipelineId: pipelineId,
      },
    });
  };

  return (
    <div
      className="wpqt-main-border wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-p-3 hover:wpqt-bg-gray-100"
      onClick={openNewStageModal}
    >
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
      <div className="wpqt-whitespace-nowrap">Add stage</div>
    </div>
  );
}

export { AddStage };
