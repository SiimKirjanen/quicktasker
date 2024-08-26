import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { ArchiveItem } from "../ArchiveItem/ArchiveItem";

function ArchiveItems() {
  const {
    state: { archivedTasks },
  } = useContext(ArchiveContext);

  if (!archivedTasks) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-2">
      {archivedTasks.map((task) => (
        <ArchiveItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export { ArchiveItems };
