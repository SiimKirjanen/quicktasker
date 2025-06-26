import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { NoFilterResults } from "../../../../components/Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../../../components/Loading/Loading";
import { ArchiveContext } from "../../../../providers/ArchiveContextProvider";
import { ArchiveItem } from "../ArchiveItem/ArchiveItem";

function ArchiveItems() {
  const {
    state: { archivedTasks, archiveLoading },
  } = useContext(ArchiveContext);

  if (archiveLoading) {
    return <Loading className="wpqt-h-[200px]" />;
  }

  if (archivedTasks && archivedTasks.length === 0) {
    return <NoFilterResults text={__("No match", "quicktasker")} />;
  }

  if (!archivedTasks) {
    return null;
  }

  return (
    <div>
      <div className="wpqt-card-grid">
        {archivedTasks.map((task) => (
          <ArchiveItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export { ArchiveItems };
