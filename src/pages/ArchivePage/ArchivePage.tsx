import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { ArchiveContextProvider } from "../../providers/ArchiveContextProvider";
import { LabelsContextProvider } from "../../providers/LabelsContextProvider";
import { Page } from "../Page/Page";
import { Archive } from "./Archive/Archive";

function ArchivePage() {
  return (
    <ArchiveContextProvider>
      <LabelsContextProvider>
        <Page>
          <WPQTPageHeader
            description={__("Archived tasks management page.", "quicktasker")}
          >
            {__("Archive", "quicktasker")}
          </WPQTPageHeader>
          <Archive />
        </Page>
      </LabelsContextProvider>
    </ArchiveContextProvider>
  );
}

export { ArchivePage };
