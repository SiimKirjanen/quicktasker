import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Fieldset,
  Textarea,
} from "@headlessui/react";
import { useContext, useState, useEffect } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import {
  CLOSE_TASK_MODAL,
  PIPELINE_ADD_TASK,
  PIPELINE_EDIT_TASK,
} from "../../constants";
import { createTaskRequest, editTaskRequest } from "../../api/api";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";

function TaskModal() {
  const {
    state: { taskModalOpen, targetStageId, taskToEdit },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskModalSaving, setTaskModalSaving] = useState(false);
  const editingTask = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const closeTaskModal = () => {
    modalDispatch({
      type: CLOSE_TASK_MODAL,
    });
  };

  const resetTaskModal = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskModalSaving(false);
  };

  const addTask = async () => {
    try {
      setTaskModalSaving(true);
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
    } catch (error) {
      setTaskModalSaving(false);
      console.error(error);
    }
  };

  const editTask = async () => {
    console.log(targetStageId);
    try {
      setTaskModalSaving(true);

      await editTaskRequest({
        id: taskToEdit!.id,
        stageId: targetStageId,
        name: taskName,
        description: taskDescription,
      });

      dispatch({
        type: PIPELINE_EDIT_TASK,
        payload: {
          targetStageId,
          task: {
            id: taskToEdit!.id,
            name: taskName,
            description: taskDescription,
          },
        },
      });

      closeTaskModal();
      resetTaskModal();
    } catch (error) {
      setTaskModalSaving(false);
      console.error(error);
    }
  };

  const saveTask = () => {
    editingTask ? editTask() : addTask();
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
              {editingTask ? "Edit task" : "Add task"}
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
                onClick={saveTask}
              >
                {taskModalSaving
                  ? "Saving..."
                  : editingTask
                  ? "Edit task"
                  : "Add task"}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export { TaskModal };
