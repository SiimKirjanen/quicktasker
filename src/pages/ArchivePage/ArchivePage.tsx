import { Page } from "../Page/Page";
import { ArchiveContextProvider } from "../../providers/ArchiveContextProvider";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Archive } from "./Archive/Archive";

function ArchivePage() {
  return (
    <ArchiveContextProvider>
      <Page>
        <WPQTPageHeader description="This is a archive page">
          Archive
        </WPQTPageHeader>
        <Archive />
      </Page>
    </ArchiveContextProvider>
  );
}

export { ArchivePage };
