import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { usePageLinks } from "../../hooks/usePageLinks";
import { Page } from "../Page/Page";

function UserAppLinkPage() {
  const { userPage } = usePageLinks();

  const openUserApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(userPage, "_blank");
  };
  return (
    <Page>
      <WPQTPageHeader
        description={__(
          "Lets you manage assigned tasks on separate page.",
          "quicktasker",
        )}
      >
        {__("User app", "quicktasker")}
      </WPQTPageHeader>
      <div>
        <a onClick={openUserApp} href="">
          {__("Open your user page", "quicktasker")}
        </a>
      </div>
    </Page>
  );
}

export { UserAppLinkPage };
