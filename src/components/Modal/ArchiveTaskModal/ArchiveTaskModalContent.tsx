import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { WPQTModalTitle } from "../WPQTModal";

function ArchiveTaskModalContent() {
  const {
    state: { archiveModalTask },
  } = useContext(ArchiveContext);

  if (!archiveModalTask) {
    return null;
  }

  return (
    <>
      <WPQTModalTitle>{archiveModalTask.name}</WPQTModalTitle>
      <div className="wpqt-flex wpqt-flex-col">
        {archiveModalTask.description && (
          <div>Description: {archiveModalTask.description}</div>
        )}
      </div>
    </>
  );
}

export { ArchiveTaskModalContent };
