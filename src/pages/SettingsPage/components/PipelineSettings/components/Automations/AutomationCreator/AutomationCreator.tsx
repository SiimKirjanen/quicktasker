import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsRobot } from "react-icons/bs";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";

function AutomationCreator() {
  const [showCreator, setShowCreator] = useState(false);

  if (!showCreator) {
    return (
      <div>
        <WPQTIconButton
          icon={<BsRobot className="wpqt-size-5" />}
          text={__("Create a new automation", "quicktasker")}
          onClick={() => setShowCreator(true)}
        />
      </div>
    );
  }
  return <div></div>;
}

export { AutomationCreator };
