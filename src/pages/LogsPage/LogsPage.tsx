import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Page } from "../Page/Page";
import { LogsPageContent } from "./components/LogsPageContent/LogsPageContent";

const LogsPage = () => {
  return (
    <Page>
      <WPQTPageHeader description={__("See logs.", "quicktasker")}>
        {__("Logs", "quicktasker")}
      </WPQTPageHeader>
      <LogsPageContent />
    </Page>
  );
};

export { LogsPage };
