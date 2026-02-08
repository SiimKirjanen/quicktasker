import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Page } from "../Page/Page";
import { PipelinesSettingsTabs } from "./components/PipelineSettings/PipelinesSettingsTabs";

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
      <PipelinesSettingsTabs />
    </Page>
  );
};

export { SettingsPage };
