import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { LiaBroomSolid } from "react-icons/lia";
import {
  ARCHIVE_SETTINGS_MODAL_OPEN,
  REMOVE_ARCHIVED_TASKS,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { useArchive } from "../../../hooks/useArchive";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { ArchiveSetting } from "./components/ArchiveSetting/ArchiveSettings";

function ArchiveSettingsModal() {
  const {
    state: { archiveSettingsModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { cleanupTaskArchive } = useTaskActions();
  const { archiveDispatch } = useArchive();

  return (
    <WPQTModal
      modalOpen={archiveSettingsModalOpen}
      closeModal={() => {
        modalDispatch({
          type: ARCHIVE_SETTINGS_MODAL_OPEN,
          payload: false,
        });
      }}
      size="md"
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-3">
        <ArchiveSetting
          title={__("Archive cleanup", "quicktasker")}
          description={__(
            "Remote tasks from archive that have no parent board.",
            "quicktasker",
          )}
          icon={<LiaBroomSolid className="wpqt-size-6" />}
          onSave={async () => {
            const { success, deletedTaskIds } = await cleanupTaskArchive();

            if (success && deletedTaskIds.length > 0) {
              archiveDispatch({
                type: REMOVE_ARCHIVED_TASKS,
                payload: deletedTaskIds,
              });
            }
          }}
        />
      </div>
    </WPQTModal>
  );
}

export { ArchiveSettingsModal };
