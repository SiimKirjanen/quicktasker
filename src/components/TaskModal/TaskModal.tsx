import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Fieldset,
  Textarea,
} from "@headlessui/react";
import { useContext, useState } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import { NEW_TASK_MODAL_OPEN, PIPELINE_ADD_TASK } from "../../constants";
import { createTaskRequest } from "../../api/api";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";

function TaskModal() {
  const {
    state: { taskModalOpen, targetStageId },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskModalLoading, setTaskModalLoading] = useState(false);

  const closeTaskModal = () => {
    modalDispatch({
      type: NEW_TASK_MODAL_OPEN,
      payload: { taskModalOpen: false },
    });
  };

  const resetTaskModal = () => {
    setTaskName("");
    setTaskDescription("");
  };

  const addTask = async () => {
    try {
      setTaskModalLoading(true);
      const response = await createTaskRequest(
        targetStageId,
        taskName,
        taskDescription
      );

      dispatch({
        type: PIPELINE_ADD_TASK,
        payload: {
          targetStageId,
          task: {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
          },
        },
      });
      closeTaskModal();
      resetTaskModal();
      setTaskModalLoading(false);
    } catch (error) {
      setTaskModalLoading(false);
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
              as="div"
              className="wpqt-text-base/7 wpqt-font-medium wpqt-text-black"
            >
              Add new task
            </DialogTitle>

            <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
              <Field className="wpqt-mb-3">
                <Label className="wpqt-block wpqt-text-sm/6 wpqt-font-medium wpqt-mb-2">
                  Name
                </Label>

                <Input
                  className={clsx(
                    "wpqt-block wpqt-w-full wpqt-border-1 wpqt-rounded-lg wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6",
                    "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25"
                  )}
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Field>

              <Field>
                <Label className="wpqt-block wpqt-text-sm/6 wpqt-font-medium wpqt-mb-2">
                  Description
                </Label>

                <Textarea
                  className={clsx(
                    "wpqt-block wpqt-w-full wpqt-resize-none wpqt-border-1 wpqt-rounded-lg wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6",
                    "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25"
                  )}
                  rows={3}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Field>
            </Fieldset>

            <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
              <Button
                className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white data-[open]:wpqt-bg-gray-700"
                onClick={addTask}
              >
                {taskModalLoading ? "Saving..." : "Add task"}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export { TaskModal };
