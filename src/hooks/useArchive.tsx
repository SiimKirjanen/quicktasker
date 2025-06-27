import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../providers/ArchiveContextProvider";

function useArchive() {
  const { archiveDispatch } = useContext(ArchiveContext);

  return {
    archiveDispatch,
  };
}

export { useArchive };
