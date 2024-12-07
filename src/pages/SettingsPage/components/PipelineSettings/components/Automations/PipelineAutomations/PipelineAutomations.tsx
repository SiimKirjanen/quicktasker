import { useEffect, useState } from "@wordpress/element";
import { getPipelineAutomationsRequest } from "../../../../../../../api/api";
import { Loading } from "../../../../../../../components/Loading/Loading";
import { Automation } from "../../../../../../../types/automation";
import { AutomationCreator } from "../AutomationCreator/AutomationCreator";
import { AutomationsList } from "../AutomationsList/AutomationsList";
import { AutomationsWrapper } from "../AutomationsWrapper/AutomationsWrapper";

type Props = {
  pipelineId: string;
};
function PipelineAutomations({ pipelineId }: Props) {
  const [automations, setAutomations] = useState<Automation[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAutomations = async () => {
      try {
        setLoading(true);
        const response = await getPipelineAutomationsRequest(pipelineId);
        setAutomations(response.data.automations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAutomations();
  }, []);

  if (loading) {
    return (
      <AutomationsWrapper>
        <Loading />
      </AutomationsWrapper>
    );
  }

  return (
    <AutomationsWrapper>
      <div className="wpqt-mb-3">
        <AutomationsList automations={automations} />
      </div>
      <div>
        <AutomationCreator pipelineId={pipelineId} />
      </div>
    </AutomationsWrapper>
  );
}

export { PipelineAutomations };
