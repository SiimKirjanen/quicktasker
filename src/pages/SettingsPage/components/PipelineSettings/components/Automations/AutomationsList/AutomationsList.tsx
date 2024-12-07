import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsRobot } from "react-icons/bs";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import { Automation } from "../../../../../../../types/automation";
import { AutomationListItem } from "../AutomationListItem/AutomationListItem";

type Props = {
  automations: Automation[] | null;
};
function AutomationsList({ automations }: Props) {
  const [showAutomations, setShowAutomations] = useState(false);

  if (!showAutomations) {
    return (
      <div>
        <WPQTIconButton
          icon={<BsRobot className="wpqt-size-5" />}
          text={__("Show existing automations", "quicktasker")}
          onClick={() => setShowAutomations(true)}
        />
      </div>
    );
  }

  if (!automations || automations.length === 0) {
    return <div>{__("No automations created", "quicktasker")}</div>;
  }

  return (
    <div>
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-3 wpqt-mb-2">
        {automations?.map((automation) => (
          <AutomationListItem key={automation.id} automation={automation} />
        ))}
      </div>
      <WPQTIconButton
        icon={<BsRobot className="wpqt-size-5" />}
        text={__("Hide automations", "quicktasker")}
        onClick={() => setShowAutomations(false)}
      />
    </div>
  );
}

export { AutomationsList };
