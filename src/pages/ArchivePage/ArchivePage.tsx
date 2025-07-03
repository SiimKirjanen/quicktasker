import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { ArchiveSettingsModal } from "../../components/Modal/ArchiveSettingsModal/ArchiveSettingsModal";
import { TaskRestoreModal } from "../../components/Modal/TaskRestoreModal/TaskRestoreModal";
import { ARCHIVE_SETTINGS_MODAL_OPEN } from "../../constants";
import { ArchiveContextProvider } from "../../providers/ArchiveContextProvider";
import { LabelsContextProvider } from "../../providers/LabelsContextProvider";
import { ModalContext } from "../../providers/ModalContextProvider";
import { Page } from "../Page/Page";
import { Archive } from "./Archive/Archive";

function ArchivePage() {
  const { modalDispatch } = useContext(ModalContext);

  return (
    <ArchiveContextProvider>
      <LabelsContextProvider>
        <Page>
          <WPQTPageHeader
            description={__("Archived tasks management page.", "quicktasker")}
            icon={
              <Cog8ToothIcon
                className="wpqt-icon-gray wpqt-size-6 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
                onClick={() => {
                  modalDispatch({
                    type: ARCHIVE_SETTINGS_MODAL_OPEN,
                    payload: true,
                  });
                }}
              />
            }
          >
            {__("Archive", "quicktasker")}
          </WPQTPageHeader>
          <Archive />
          <ArchiveSettingsModal />
          <TaskRestoreModal />
        </Page>
      </LabelsContextProvider>
    </ArchiveContextProvider>
  );
}

export { ArchivePage };
