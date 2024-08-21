import { DialogTitle } from "@headlessui/react";
import { useContext, useState, useEffect } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import {
  CLOSE_TASK_MODAL,
  PIPELINE_ADD_TASK,
  PIPELINE_EDIT_TASK,
} from "../../../constants";
import { createTaskRequest, editTaskRequest } from "../../../api/api";
import { PipelineContext } from "../../../providers/PipelineContextProvider";

import TaskModalContent from "./TaskModalContent";
import { WPQTModal } from "../WPQTModal";

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

  const handleSuccess = (type: string, task: any) => {
    dispatch({
      type,
      payload: {
        targetStageId,
        task,
      },
    });
    closeTaskModal();
    resetTaskModal();
  };

  const handleError = (error: any) => {
    setTaskModalSaving(false);
    console.error(error);
  };

  const addTask = async () => {
    try {
      setTaskModalSaving(true);
      const response = await createTaskRequest(
        targetStageId,
        taskName,
        taskDescription,
      );
      handleSuccess(PIPELINE_ADD_TASK, {
        ...response.data,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const editTask = async () => {
    try {
      setTaskModalSaving(true);
      await editTaskRequest({
        id: taskToEdit!.id,
        stage_id: targetStageId,
        name: taskName,
        description: taskDescription,
      });
      handleSuccess(PIPELINE_EDIT_TASK, {
        id: taskToEdit!.id,
        name: taskName,
        description: taskDescription,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const saveTask = () => {
    editingTask ? editTask() : addTask();
  };

  return (
    <WPQTModal modalOpen={taskModalOpen} closeModal={closeTaskModal}>
      <DialogTitle
        as="div"
        className="wpqt-text-base/7 wpqt-font-medium wpqt-text-black"
      >
        {editingTask ? "Edit task" : "Add task"}
      </DialogTitle>

      <TaskModalContent
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        saveTask={saveTask}
        taskModalSaving={taskModalSaving}
        editingTask={editingTask}
      />
    </WPQTModal>
  );
}

export { TaskModal };
