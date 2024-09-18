import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../providers/ArchiveContextProvider";
import { Loading } from "../Loading/Loading";
import { ArchiveFilter } from "../Filters/ArchiveFilter/ArchiveFilter";
import { ArchiveItems } from "./ArchiveItems/ArchiveItems";
import { ArchiveTaskModal } from "../Modal/ArchiveTaskModal/ArchiveTaskModal";

function Archive() {
  const {
    state: { archivedTasks },
  } = useContext(ArchiveContext);

  if (!archivedTasks) {
    return <Loading className="wpqt-h-[200px]" />;
  }

  return (
    <div>
      <ArchiveFilter />
      <ArchiveItems />
      <ArchiveTaskModal />
    </div>
  );
}

export { Archive };
