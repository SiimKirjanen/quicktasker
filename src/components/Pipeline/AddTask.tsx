import { useContext } from "@wordpress/element";
import { OPEN_NEW_TASK_MODAL } from "../../constants";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "../../providers/ModalContextProvider";

type Props = {
  stageId: string;
};

function AddTask({ stageId }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  const openNewTaskModal = async () => {
    modalDispatch({
      type: OPEN_NEW_TASK_MODAL,
      payload: { targetStageId: stageId },
    });
  };

  return (
    <div
      className="wpqt-flex wpqt-justify-center wpqt-cursor-pointer wpqt-text-center wpqt-p-2 wpqt-z-10 wpqt-sticky wpqt-bottom-0 wpqt-order-1 wpqt-bg-gray-100"
      onClick={openNewTaskModal}
    >
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
    </div>
  );
}

export { AddTask };
