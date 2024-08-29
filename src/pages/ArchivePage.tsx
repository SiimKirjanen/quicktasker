import { Archive } from "../components/Archive/Archive";
import { Page } from "./Page/Page";
import { ArchiveContextProvider } from "../providers/ArchiveContextProvider";

function ArchivePage() {
  return (
    <ArchiveContextProvider>
      <Page>
        <Archive />
      </Page>
    </ArchiveContextProvider>
  );
}

export { ArchivePage };
