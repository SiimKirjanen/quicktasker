import { useContext } from "@wordpress/element";
import { PipelineAutomationsContext } from "../../../../providers/PipelineAutomationsContextProvider";
import { PipelineAutomation } from "../PipelineAutomation/PipelineAutomation";

function PipelineAutomations() {
  const {
    state: { automations },
  } = useContext(PipelineAutomationsContext);

  if (!automations || automations.length === 0) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-6 wpqt-mx-auto wpqt-max-w-7xl">
      {automations.map((automation) => (
        <PipelineAutomation key={automation.id} automation={automation} />
      ))}
    </div>
  );
}

export { PipelineAutomations };
