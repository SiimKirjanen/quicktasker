import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { ArchiveItem } from "../ArchiveItem/ArchiveItem";
import { useArchiveFilter } from "../../../hooks/useArchiveFilter";

function ArchiveItems() {
  const {
    state: { archivedTasks },
  } = useContext(ArchiveContext);
  const { filterArchive } = useArchiveFilter();

  if (!archivedTasks) {
    return null;
  }

  return (
    <div>
      <div className="wpqt-grid wpqt-grid-cols-4 wpqt-gap-2">
        {archivedTasks.filter(filterArchive).map((task) => (
          <ArchiveItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export { ArchiveItems };
