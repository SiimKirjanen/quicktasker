import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Page } from "../Page/Page";
import { CustomStyleSetting } from "./components/CustomStyleSetting/CustomStyleSetting";

const SettingsPage = () => {
  return (
    <Page>
      <WPQTPageHeader
        description={__(
          "Manage settings, preferences, and configurations.",
          "quicktasker",
        )}
      >
        {__("Settings", "quicktasker")}
      </WPQTPageHeader>
      <CustomStyleSetting />
    </Page>
  );
};

export { SettingsPage };
