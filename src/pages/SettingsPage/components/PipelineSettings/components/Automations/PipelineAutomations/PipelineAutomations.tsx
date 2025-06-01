import { PipelineAutomationsContextProvider } from "../../../../../../../providers/PipelineAutomationsContextProvider";
import { AutomationCreator } from "../AutomationCreator/AutomationCreator";
import { AutomationsList } from "../AutomationsList/AutomationsList";
import { AutomationsWrapper } from "../AutomationsWrapper/AutomationsWrapper";

type Props = {
  pipelineId: string;
};
function PipelineAutomations({ pipelineId }: Props) {
  return (
    <PipelineAutomationsContextProvider pipelineId={pipelineId}>
      <AutomationsWrapper>
        <div className="wpqt-mb-4">
          <AutomationsList />
        </div>

        <AutomationCreator pipelineId={pipelineId} />
      </AutomationsWrapper>
    </PipelineAutomationsContextProvider>
  );
}

export { PipelineAutomations };
