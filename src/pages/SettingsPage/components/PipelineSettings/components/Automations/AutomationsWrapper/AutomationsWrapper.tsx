import { __ } from "@wordpress/i18n";
import { Settings } from "../../../../Settings/Settings";

type Props = {
  children: React.ReactNode;
};
function AutomationsWrapper({ children }: Props) {
  return (
    <Settings
      title={__("Board automations", "quicktasker")}
      description={__("Allows to automate various tasks", "quicktasker")}
    >
      {children}
    </Settings>
  );
}

export { AutomationsWrapper };
