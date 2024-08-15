import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useContext } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import { NEW_TASK_MODAL_OPEN, PIPELINE_ADD_TASK } from "../../constants";
import { createTaskRequest } from "../../api/api";
import { PipelineContext } from "../../providers/PipelineContextProvider";

function Modal() {
  const {
    state: { taskModalOpen, targetStageId },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);

  const closeTaskModal = () => {
    modalDispatch({
      type: NEW_TASK_MODAL_OPEN,
      payload: { taskModalOpen: false },
    });
  };

  const addTask = async () => {
    try {
      const taskName = `New task`;
      const response = await createTaskRequest(targetStageId, taskName);
      console.log("Here!!!! ", targetStageId);
      dispatch({
        type: PIPELINE_ADD_TASK,
        payload: {
          targetStageId,
          task: {
            id: response.data.id,
            name: response.data.name,
          },
        },
      });
      //closeTaskModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={taskModalOpen}
      as="div"
      className="wpqt-relative wpqt-z-10 focus:wpqt-outline-none"
      onClose={closeTaskModal}
    >
      <DialogBackdrop className="wpqt-fixed wpqt-inset-0 wpqt-bg-black/40" />
      <div className="wpqt-fixed wpqt-inset-0 wpqt-z-10 wpqt-w-screen wpqt-overflow-y-auto">
        <div className="wpqt-flex wpqt-min-h-full wpqt-items-center wpqt-justify-center wpqt-p-4">
          <DialogPanel
            transition
            className="wpqt-w-full wpqt-max-w-md wpqt-rounded-xl wpqt-bg-white wpqt-p-6 wpqt-backdrop-blur-2xl wpqt-duration-300 wpqt-ease-out data-[closed]:wpqt-transform-[wpqt-scale(95%)] data-[closed]:wpqt-opacity-0"
          >
            <DialogTitle
              as="h3"
              className="wpqt-text-base/7 wpqt-font-medium wpqt-text-black"
            >
              Payment successful
            </DialogTitle>
            <p className="wpqt-mt-2 wpqt-text-sm/6">
              Your payment has been successfully submitted. We’ve sent you an
              email with all of the details of your order.
            </p>
            <div className="wpqt-mt-4">
              <Button
                className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white data-[open]:wpqt-bg-gray-700"
                onClick={addTask}
              >
                Add task
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export { Modal };
