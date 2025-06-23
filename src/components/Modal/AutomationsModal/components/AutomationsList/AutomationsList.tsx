import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PipelineAutomationsContext } from "../../../../../providers/PipelineAutomationsContextProvider";
import { Alert } from "../../../../common/Alert/Alert";
import { Loading } from "../../../../Loading/Loading";
import { AutomationListItem } from "../AutomationListItem/AutomationListItem";

function AutomationsList() {
  const {
    state: { automations, loading },
  } = useContext(PipelineAutomationsContext);

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

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-mx-auto wpqt-max-w-7xl">
      {automations.map((automation) => (
        <AutomationListItem key={automation.id} automation={automation} />
      ))}
    </div>
  );
}

export { AutomationsList };
