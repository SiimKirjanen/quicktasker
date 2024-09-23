import {
  EllipsisHorizontalIcon,
  TrashIcon,
  EyeIcon,
  ArrowUturnUpIcon,
} from "@heroicons/react/24/outline";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";
import { useTaskActions } from "../../../hooks/useTaskActions";
import { ArchivedTask } from "../../../types/task";
import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { REMOVE_ARCHIVED_TASK } from "../../../constants";

type Props = {
  task: ArchivedTask;
};

function ArchivedTaskDropdown({ task }: Props) {
  const { deleteTask, restoreArchivedTask } = useTaskActions();
  const { archiveDispatch } = useContext(ArchiveContext);

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
        text="View task"
        icon={<EyeIcon className="wpqt-icon-blue wpqt-size-4" />}
      />

      <WPQTDropdownItem
        text="Restore task"
        icon={<ArrowUturnUpIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={async (e: React.MouseEvent) => {
          e.stopPropagation();
          await restoreArchivedTask(task.id, () => {
            archiveDispatch({
              type: REMOVE_ARCHIVED_TASK,
              payload: task.id,
            });
          });
        }}
      />

      <WPQTDropdownItem
        text="Delete"
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        onClick={async (e: React.MouseEvent) => {
          e.stopPropagation();
          await deleteTask(task.id, () => {
            archiveDispatch({
              type: REMOVE_ARCHIVED_TASK,
              payload: task.id,
            });
          });
        }}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { ArchivedTaskDropdown };
