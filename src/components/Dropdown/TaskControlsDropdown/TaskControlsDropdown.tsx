import {
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
  PaintBrushIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BiMove } from "react-icons/bi";
import {
  OPEN_EDIT_TASK_MODAL,
  OPEN_MOVE_TASK_MODAL,
  OPEN_TASK_COLOR_MODAL,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { AppContext } from "../../../providers/AppContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task } from "../../../types/task";
import { WPQTConfirmTooltip } from "../../Dialog/ConfirmTooltip/ConfirmTooltip";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

type Props = {
  task: Task;
};

function TaskControlsDropdown({ task }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const {
    state: { activePipeline },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const {
    state: { isUserAllowedToDelete },
  } = useContext(AppContext);
  const { deleteTask, archiveTask } = useTaskActions();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openTaskEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();

    modalDispatch({
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
      },
    });
  };

  const openTaskColorModal = (e: React.MouseEvent) => {
    e.stopPropagation();

    modalDispatch({
      type: OPEN_TASK_COLOR_MODAL,
      payload: { task },
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
        text={__("Color", "quicktasker")}
        icon={<PaintBrushIcon className="wpqt-icon-orange wpqt-size-4" />}
        onClick={openTaskColorModal}
      />
      <WPQTDropdownItem
        text={__("Move task", "quicktasker")}
        icon={<BiMove className="wpqt-icon-blue wpqt-size-4" />}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          modalDispatch({
            type: OPEN_MOVE_TASK_MODAL,
            payload: { task },
          });
        }}
      />
      {isUserAllowedToDelete && (
        <WPQTConfirmTooltip
          onConfirm={async () => {
            setDeleteLoading(true);
            await deleteTask(task.id, () => {
              fetchAndSetPipelineData(activePipeline!.id);
            });
            setDeleteLoading(false);
          }}
          confirmMessage={__(
            "Are you sure you want to delete this task?",
            "quicktasker",
          )}
          confirmButtonText={__("Delete", "quicktasker")}
        >
          {({ onClick }) => (
            <WPQTDropdownItem
              text={__("Delete task", "quicktasker")}
              icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
              loading={deleteLoading}
              onClick={onClick}
              className="!wpqt-mb-0"
            />
          )}
        </WPQTConfirmTooltip>
      )}
    </WPQTDropdown>
  );
}

export { TaskControlsDropdown };
