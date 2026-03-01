import {
  ArrowUturnUpIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  OPEN_TASK_RESTORE_MODAL,
  REMOVE_ARCHIVED_TASK,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { AppContext } from "../../../providers/AppContextProvider";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
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

function ArchivedTaskDropdown({ task }: Props) {
  const {
    state: { isUserAllowedToDelete },
  } = useContext(AppContext);
  const { archiveDispatch } = useContext(ArchiveContext);
  const { deleteTask } = useTaskActions();
  const { modalDispatch } = useContext(ModalContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    await deleteTask(task.id, () => {
      archiveDispatch({
        type: REMOVE_ARCHIVED_TASK,
        payload: task.id,
      });
    });
    setIsDeleting(false);
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
        text={__("View task", "quicktasker")}
        icon={<EyeIcon className="wpqt-icon-blue wpqt-size-4" />}
      />

      <WPQTDropdownItem
        text={__("Restore task", "quicktasker")}
        icon={<ArrowUturnUpIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={async (e: React.MouseEvent) => {
          e.stopPropagation();

          modalDispatch({
            type: OPEN_TASK_RESTORE_MODAL,
            payload: {
              taskToRestore: task,
            },
          });
        }}
      />

      {isUserAllowedToDelete && (
        <WPQTConfirmTooltip
          onConfirm={handleDeleteTask}
          confirmMessage={__(
            "Are you sure you want to permanently delete this task?",
            "quicktasker",
          )}
        >
          {({ onClick }) => (
            <WPQTDropdownItem
              text={__("Delete", "quicktasker")}
              loading={isDeleting}
              icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
              onClick={onClick}
              className="!wpqt-mb-0"
            />
          )}
        </WPQTConfirmTooltip>
      )}
    </WPQTDropdown>
  );
}

export { ArchivedTaskDropdown };
