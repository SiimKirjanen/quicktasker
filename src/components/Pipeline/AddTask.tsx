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
      className="wpqt-sticky wpqt-bottom-0 wpqt-z-10 wpqt-order-1 wpqt-mt-2 wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-bg-gray-100 wpqt-p-2 wpqt-text-center"
      onClick={openNewTaskModal}
    >
      Add task
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
    </div>
  );
}

export { AddTask };
