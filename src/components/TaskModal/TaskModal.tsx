import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
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

import ModalContent from "./TaskModalContent";

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

            <ModalContent
              taskName={taskName}
              setTaskName={setTaskName}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              saveTask={saveTask}
              taskModalSaving={taskModalSaving}
              editingTask={editingTask}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export { TaskModal };
