import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { BsRobot } from "react-icons/bs";
import { Alert } from "../../../../../../../components/common/Alert/Alert";
import { WPQTIconButton } from "../../../../../../../components/common/Button/Button";
import { Loading } from "../../../../../../../components/Loading/Loading";
import { PipelineAutomationsContext } from "../../../../../../../providers/PipelineAutomationsContextProvider";
import { AutomationListItem } from "../AutomationListItem/AutomationListItem";

function AutomationsList() {
  const {
    state: { automations, loading },
  } = useContext(PipelineAutomationsContext);
  const [showAutomations, setShowAutomations] = useState(true);

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  if (!automations || automations.length === 0) {
    return (
      <Alert type="info">
        {__("No automations created for this board", "quicktasker")}
      </Alert>
    );
  }

  if (!showAutomations) {
    return (
      <div>
        <WPQTIconButton
          icon={<BsRobot className="wpqt-size-5" />}
          text={__("Show board automations", "quicktasker")}
          onClick={() => setShowAutomations(true)}
        />
      </div>
    );
  }

  return (
    <div className="wpqt-flex wpqt-flex-col">
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3 wpqt-mb-3">
        {automations.map((automation) => (
          <AutomationListItem key={automation.id} automation={automation} />
        ))}
      </div>
      <div className="wpqt-flex wpqt-justify-center">
        <WPQTIconButton
          icon={<BsRobot className="wpqt-size-5" />}
          text={__("Hide board automations", "quicktasker")}
          onClick={() => setShowAutomations(false)}
        />
      </div>
    </div>
  );
}

export { AutomationsList };
