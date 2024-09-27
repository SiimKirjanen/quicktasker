import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../../providers/ArchiveContextProvider";
import { useArchiveFilter } from "../../../../hooks/filters/useArchiveFilter";
import { ArchiveItem } from "../ArchiveItem/ArchiveItem";

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
