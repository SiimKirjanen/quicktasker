import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../providers/ArchiveContextProvider";
import { Loading } from "../Loading/Loading";
import { ArchiveControls } from "./ArchiveControls/ArchiveControls";
import { ArchiveItems } from "./ArchiveItems/ArchiveItems";

function Archive() {
  const {
    state: { archivedTasks },
  } = useContext(ArchiveContext);

  if (!archivedTasks) {
    return <Loading />;
  }

  return (
    <div>
      <ArchiveControls />
      <ArchiveItems />
    </div>
  );
}

export { Archive };
