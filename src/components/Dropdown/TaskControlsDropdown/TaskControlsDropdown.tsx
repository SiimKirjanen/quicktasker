import { useContext } from "@wordpress/element";
import { OPEN_EDIT_TASK_MODAL } from "../../../constants";
import { __ } from "@wordpress/i18n";
import {
  EllipsisHorizontalIcon,
  ArchiveBoxIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task } from "../../../types/task";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";

type Props = {
  task: Task;
};

function TaskControlsDropdown({ task }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const { deleteTask, archiveTask } = useTaskActions();
  const {
    state: { activePipeline },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);

  const openTaskEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();

    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
      },
    });
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
        text={__("Archive task", "quicktasker")}
        icon={<ArchiveBoxIcon className="wpqt-icon-blue wpqt-size-4" />}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          archiveTask(task.id, () => {
            fetchAndSetPipelineData(activePipeline!.id);
          });
        }}
      />
      <WPQTDropdownItem
        text={__("Edit task", "quicktasker")}
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={openTaskEditModal}
      />
      <WPQTDropdownItem
        text={__("Delete task", "quicktasker")}
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        onClick={async (e: React.MouseEvent) => {
          e.stopPropagation();
          await deleteTask(task.id, () => {
            fetchAndSetPipelineData(activePipeline!.id);
          });
        }}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { TaskControlsDropdown };
