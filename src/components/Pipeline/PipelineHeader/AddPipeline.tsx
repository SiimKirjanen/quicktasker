import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "@wordpress/element";
import { OPEN_NEW_PIPELINE_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";

function AddPipeline() {
  const { modalDispatch } = useContext(ModalContext);

  const openPipelineModal = async () => {
    modalDispatch({
      type: OPEN_NEW_PIPELINE_MODAL,
    });
  };

  return (
    <div
      className="wpqt-flex wpqt-cursor-pointer wpqt-items-center"
      onClick={openPipelineModal}
    >
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
      Add Board
    </div>
  );
}

export { AddPipeline };
