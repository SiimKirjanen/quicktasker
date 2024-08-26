import { Archive } from "../components/Archive/Archive";
import { ArchiveContextProvider } from "../providers/ArchiveContextProvider";

function ArchivePage() {
  return (
    <ArchiveContextProvider>
      <div>
        <Archive />
      </div>
    </ArchiveContextProvider>
  );
}

export { ArchivePage };
