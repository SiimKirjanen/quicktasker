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
      <WPQTPageHeader description={__("Info about the plugin.", "quicktasker")}>
        {__("About", "quicktasker")}
      </WPQTPageHeader>
      <div>
        <p>
          Thank you for your interest in the QuickTasker project. For any
          suggestions or concerns, please write to{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://wordpress.org/support/plugin/quicktasker/"
          >
            support forum.
          </a>
        </p>
        <p>
          For some reading material about the plugin, you can check out the{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={pluginURL + "help/index.html"}
          >
            plugin guide.
          </a>
        </p>
      </div>
    </Page>
  );
};

export { GuidePage };
