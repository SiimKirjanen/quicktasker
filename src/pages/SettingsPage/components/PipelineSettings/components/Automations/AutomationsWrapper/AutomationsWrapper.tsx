import { __ } from "@wordpress/i18n";
import { HAS_AUTOMATIONS } from "../../../../../../../constants";
import { Settings } from "../../../../Settings/Settings";

type Props = {
  children: React.ReactNode;
};
function AutomationsWrapper({ children }: Props) {
  const description = HAS_AUTOMATIONS
    ? __("Set up automated processes to help manage your boards", "quicktasker")
    : __(
        "Set up automated processes to help manage your boards. To create more than one automation, please upgrade to the premium version.",
        "quicktasker",
      );
  return (
    <Settings
      title={__("Board automations", "quicktasker")}
      description={description}
    >
      {children}
    </Settings>
  );
}

export { AutomationsWrapper };
