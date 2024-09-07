import { useContext } from "@wordpress/element";
import { OPEN_NEW_TASK_MODAL } from "../../constants";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
    <div className="wpqt-sticky wpqt-bottom-0 wpqt-z-10 wpqt-order-1 wpqt-mt-2 wpqt-flex wpqt-justify-center wpqt-bg-gray-100 wpqt-py-2">
      <div
        onClick={openNewTaskModal}
        className="wpqt-main-border wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-p-2 hover:wpqt-bg-white"
      >
        Add task
        <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
      </div>
    </div>
  );
}

export { AddTask };
