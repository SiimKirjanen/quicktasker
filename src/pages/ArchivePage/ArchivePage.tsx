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
            rightSideContent={
              <span
                data-testid="archive-settings-button"
                className="wpqt-inline-flex wpqt-items-center wpqt-cursor-pointer wpqt-text-blue-500 wpqt-group wpqt-gap-1 wpqt-border wpqt-border-solid wpqt-border-blue-400 wpqt-rounded wpqt-px-3 wpqt-py-1 hover:wpqt-bg-blue-50 hover:wpqt-border-blue-600"
                onClick={() => {
                  modalDispatch({
                    type: ARCHIVE_SETTINGS_MODAL_OPEN,
                    payload: true,
                  });
                }}
              >
                <Cog8ToothIcon className="wpqt-size-4 group-hover:wpqt-text-blue-600" />
                <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
                  {__("Settings", "quicktasker")}
                </span>
              </span>
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
