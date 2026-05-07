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
    <div className="wpqt-grid wpqt-grid-cols-1 md:wpqt-grid-cols-2 xl:wpqt-grid-cols-3 wpqt-gap-4">
      {automations.map((automation) => (
        <PipelineAutomation key={automation.id} automation={automation} />
      ))}
    </div>
  );
}

export { PipelineAutomations };
