import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { AppContext } from "../../providers/AppContextProvider";
import { Page } from "../Page/Page";

const GuidePage = () => {
  const {
    state: { pluginURL },
  } = useContext(AppContext);

  return (
    <Page>
      <WPQTPageHeader
        description={__(
          "Reading material about QuickTasker features and usage.",
          "quicktasker",
        )}
      >
        {__("Guide", "quicktasker")}
      </WPQTPageHeader>
      <div>
        <a
          target="_blank"
          rel="noreferrer"
          href={pluginURL + "help/index.html"}
        >
          {__("View Guide", "quicktasker")}
        </a>
      </div>
    </Page>
  );
};

export { GuidePage };
