import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../../providers/PipelineContextProvider";
import { OPEN_EDIT_TASK_MODAL } from "../../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TrashIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task } from "../../../types/task";
import { deleteTaskRequest } from "../../../api/api";

type Props = {
  task: Task;
};

function TaskControlsDropdown({ task }: Props) {
  const {
    dispatch,
    state: { activePipeline },
    fetchAndSetPipelineData,
  } = useContext(PipelineContext);
  const { modalDispatch } = useContext(ModalContext);

  const deleteTask = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    try {
      await deleteTaskRequest(task.id);
      fetchAndSetPipelineData(activePipeline!.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete a task");
    }
  };

  const openTaskEditModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
      },
    });
  };

  return (
    <Menu>
      <MenuButton
        className="wpqt-strip-btn hover:wpqt-blue-500 wpqt-cursor-pointer"
        onClick={(event) => event.stopPropagation()}
      >
        <EllipsisHorizontalIcon className="wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        transition
        className="wpqt-z-20 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        <MenuItem>
          <div
            className="wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-items-center"
            onClick={openTaskEditModal}
          >
            <TrashIcon className="wpqt-size-4 wpqt-text-red-600" />
            Edit task
          </div>
        </MenuItem>

        <MenuItem>
          <div
            className="wpqt-mt-5 wpqt-flex wpqt-cursor-pointer wpqt-items-center"
            onClick={deleteTask}
          >
            <TrashIcon className="wpqt-size-4 wpqt-text-red-600" />
            Delete task
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export { TaskControlsDropdown };
