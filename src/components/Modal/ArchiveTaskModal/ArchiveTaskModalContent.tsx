import { useContext } from "@wordpress/element";
import { WPQTModalTitle } from "../WPQTModal";
import { ModalContext } from "../../../providers/ModalContextProvider";

function ArchiveTaskModalContent() {
  const {
    state: { archiveModalTask },
  } = useContext(ModalContext);

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
        <div>Board id: {archiveModalTask.pipeline_id}</div>
      </div>
    </>
  );
}

export { ArchiveTaskModalContent };
