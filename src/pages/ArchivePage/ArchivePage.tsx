import { __ } from "@wordpress/i18n";
import { Page } from "../Page/Page";
import { ArchiveContextProvider } from "../../providers/ArchiveContextProvider";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Archive } from "./Archive/Archive";

function ArchivePage() {
  return (
    <ArchiveContextProvider>
      <Page>
        <WPQTPageHeader
          description={__("Archived tasks management page.", "quicktasker")}
        >
          {__("Archive", "quicktasker")}
        </WPQTPageHeader>
        <Archive />
      </Page>
    </ArchiveContextProvider>
  );
}

export { ArchivePage };
