import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Page } from "../Page/Page";

function NoAccessPage() {
  return (
    <Page>
      <WPQTPageHeader
        description={__(
          "You don't have permission to access this page.",
          "quicktasker",
        )}
      >
        {__("No access", "quicktasker")}
      </WPQTPageHeader>
    </Page>
  );
}

export { NoAccessPage };
