import { useContext } from "@wordpress/element";
import { ArchiveFilter } from "../../../components/Filter/ArchiveFilter/ArchiveFilter";
import { Loading } from "../../../components/Loading/Loading";
import { ArchiveTaskModal } from "../../../components/Modal/ArchiveTaskModal/ArchiveTaskModal";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { ArchiveItems } from "./ArchiveItems/ArchiveItems";

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
