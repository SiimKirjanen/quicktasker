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
    <div className="wpqt-flex wpqt-flex-wrap wpqt-justify-center wpqt-gap-4">
      {automations.map((automation) => (
        <div
          key={automation.id}
          className="wpqt-w-full md:wpqt-w-[calc(33%-0.5rem)] xl:wpqt-w-[calc(25%-0.75rem)] wpqt-flex"
        >
          <PipelineAutomation automation={automation} />
        </div>
      ))}
    </div>
  );
}

export { PipelineAutomations };
