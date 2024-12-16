import { __ } from "@wordpress/i18n";
import { PremiumAd } from "../../../../../../../components/PremiudAd/PremiumAd";
import { HAS_AUTOMATIONS } from "../../../../../../../constants";
import { PipelineAutomationsContextProvider } from "../../../../../../../providers/PipelineAutomationsContextProvider";
import { AutomationCreator } from "../AutomationCreator/AutomationCreator";
import { AutomationsList } from "../AutomationsList/AutomationsList";
import { AutomationsWrapper } from "../AutomationsWrapper/AutomationsWrapper";

type Props = {
  pipelineId: string;
};
function PipelineAutomations({ pipelineId }: Props) {
  if (!HAS_AUTOMATIONS) {
    return (
      <PremiumAd
        title={__("Board automations", "quicktasker")}
        description={__(
          "Premium feature to automate various tasks.",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <PipelineAutomationsContextProvider pipelineId={pipelineId}>
      <AutomationsWrapper>
        <div className="wpqt-mb-4">
          <AutomationsList />
        </div>
        <div>
          <AutomationCreator pipelineId={pipelineId} />
        </div>
      </AutomationsWrapper>
    </PipelineAutomationsContextProvider>
  );
}

export { PipelineAutomations };
