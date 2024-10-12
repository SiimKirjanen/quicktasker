import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../providers/ArchiveContextProvider";
import { Task } from "../../types/task";

const useArchiveFilter = () => {
  const {
    state: { archiveSearchValue, archiveFilteredPipelineId },
  } = useContext(ArchiveContext);

  const filterArchive = (archivedTask: Task) => {
    const matchesSearchValue =
      archivedTask.name
        .toLowerCase()
        .includes(archiveSearchValue.toLowerCase()) ||
      (archivedTask.description &&
        archivedTask.description
          .toLowerCase()
          .includes(archiveSearchValue.toLowerCase()));

    const matchesPipelineId =
      !archiveFilteredPipelineId ||
      archivedTask.pipeline_id === archiveFilteredPipelineId;

    return matchesSearchValue && matchesPipelineId;
  };

  return {
    filterArchive,
  };
};

export { useArchiveFilter };
