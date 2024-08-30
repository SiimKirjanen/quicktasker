import { useContext } from "@wordpress/element";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { OPEN_EDIT_TASK_MODAL } from "../../../constants";
import {
  EllipsisHorizontalIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task } from "../../../types/task";
import { archiveTaskRequest, deleteTaskRequest } from "../../../api/api";
import { WPQTDropdown, WPQTDropdownItem } from "../WPQTDropdown";

type Props = {
  task: Task;
};

function TaskControlsDropdown({ task }: Props) {
  const {
    state: { activePipeline },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const { modalDispatch } = useContext(ModalContext);

  const deleteTask = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await deleteTaskRequest(task.id);
      fetchAndSetPipelineData(activePipeline!.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete a task");
    }
  };

  const openTaskEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();

    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
      },
    });
  };

  const archiveTask = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await archiveTaskRequest(task.id);
      fetchAndSetPipelineData(activePipeline!.id);
      toast.success("Task archived successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to archive a task");
    }
  };

  return (
    <WPQTDropdown
      menuBtn={
        <EllipsisHorizontalIcon className="wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover" />
      }
    >
      <WPQTDropdownItem
        text="Archive task"
        icon={<ArchiveBoxIcon className="wpqt-size-4 wpqt-text-red-600" />}
        onClick={archiveTask}
      />
      <WPQTDropdownItem
        text="Edit task"
        icon={<ArchiveBoxIcon className="wpqt-size-4 wpqt-text-red-600" />}
        onClick={openTaskEditModal}
      />
      <WPQTDropdownItem
        text="Delete task"
        icon={<ArchiveBoxIcon className="wpqt-size-4 wpqt-text-red-600" />}
        onClick={deleteTask}
      />
    </WPQTDropdown>
  );
}

export { TaskControlsDropdown };
