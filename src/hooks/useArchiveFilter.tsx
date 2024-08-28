import { useContext } from "@wordpress/element";
import { ArchivedTask } from "../types/task";
import { ArchiveContext } from "../providers/ArchiveContextProvider";

const useArchiveFilter = () => {
  const {
    state: { archiveSearchValue },
  } = useContext(ArchiveContext);

  const filterArchive = (archivedTask: ArchivedTask) => {
    if (
      archivedTask.name.toLowerCase().includes(archiveSearchValue.toLowerCase())
    ) {
      return true;
    }
    if (
      archivedTask.description &&
      archivedTask.description
        .toLowerCase()
        .includes(archiveSearchValue.toLowerCase())
    ) {
      return true;
    }

    return false;
  };

  return {
    filterArchive,
  };
};

export { useArchiveFilter };
