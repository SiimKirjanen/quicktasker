import { useContext } from "@wordpress/element";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { OPEN_EDIT_TASK_MODAL } from "../../../constants";
import {
  EllipsisHorizontalIcon,
  ArchiveBoxIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task } from "../../../types/task";
import { archiveTaskRequest, deleteTaskRequest } from "../../../api/api";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

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
      menuBtn={({ active }) => (
        <WPQTDropdownIcon
          isActive={active}
          IconComponent={EllipsisHorizontalIcon}
        />
      )}
    >
      <WPQTDropdownItem
        text="Archive task"
        icon={<ArchiveBoxIcon className="wpqt-icon-blue wpqt-size-4" />}
        onClick={archiveTask}
      />
      <WPQTDropdownItem
        text="Edit task"
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={openTaskEditModal}
      />
      <WPQTDropdownItem
        text="Delete task"
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        onClick={deleteTask}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { TaskControlsDropdown };
