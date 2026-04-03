import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";

import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Info } from "../../components/Info/Info";
import { Loading } from "../../components/Loading/Loading";
import { AutomationLogsModal } from "../../components/Modal/AutomationLogsModal/AutomationLogsModal";
import { useAutomations } from "../../hooks/useAutomations";
import { useMissingContent } from "../../hooks/useMissingContent";
import { useNavigation } from "../../hooks/useNavigation";
import { usePipelines } from "../../hooks/usePipelines";
import { PipelineAutomationsContextProvider } from "../../providers/PipelineAutomationsContextProvider";
import { Page } from "../Page/Page";
import { AutomationCreator } from "./components/AutomationCreator/AutomationCreator";
import { PipelineAutomations } from "./components/PipelineAutomations/PipelineAutomations";
import { PipelineAutomationsInfo } from "./components/PipelineAutomationsInfo/PipelineAutomationsInfo";

type Props = {
  pipelineId: string;
};

function AutomationsPageContent({ pipelineId }: Props) {
  const { loading } = useAutomations();
  const { pipelineMissing } = useMissingContent();

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  if (pipelineMissing) {
    return (
      <Info
        infoDescription={__(
          "The board related to these automations seems to be missing. It may have been deleted.",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <div>
      <h2>{__("Created automations", "quicktasker")}</h2>
      <PipelineAutomationsInfo />
      <PipelineAutomations />
      <h2>{__("Create a new automation", "quicktasker")}</h2>
      <p>{__("Follow the steps to create a new automation.", "quicktasker")}</p>
      <AutomationCreator pipelineId={pipelineId} />
      <AutomationLogsModal />
    </div>
  );
}

function AutomationsPage({ pipelineId }: Props) {
  const { pipelines } = usePipelines();
  const { navigatePageWithoutHistory } = useNavigation();
  const { pipelineMissing } = useMissingContent();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <PipelineAutomationsContextProvider pipelineId={pipelineId}>
      <Page>
        {!pipelineMissing && (
          <WPQTPageHeader
            description={__(
              "Set up automated processes to help manage your board.",
              "quicktasker",
            )}
            rightSideContent={
              <PipelineSelectionDropdown
                activePipeline={activePipeline}
                enableActions={false}
                onPipelineClick={(id) => {
                  navigatePageWithoutHistory(`#/board/${id}/automations`);
                }}
              />
            }
          >
            {__("Board automations", "quicktasker")}
          </WPQTPageHeader>
        )}
        <AutomationsPageContent pipelineId={pipelineId} />
      </Page>
    </PipelineAutomationsContextProvider>
  );
}

export { AutomationsPage };
