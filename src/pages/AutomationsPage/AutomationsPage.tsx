import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";

import { Loading } from "../../components/Loading/Loading";
import { AutomationLogsModal } from "../../components/Modal/AutomationLogsModal/AutomationLogsModal";
import { useAutomations } from "../../hooks/useAutomations";
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

  if (loading) {
    return <Loading ovalSize="24" />;
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
  return (
    <PipelineAutomationsContextProvider pipelineId={pipelineId}>
      <Page>
        <WPQTPageHeader
          description={__(
            "Set up automated processes to help manage your board.",
            "quicktasker",
          )}
        >
          {__("Board automations", "quicktasker")}
        </WPQTPageHeader>
        <AutomationsPageContent pipelineId={pipelineId} />
      </Page>
    </PipelineAutomationsContextProvider>
  );
}

export { AutomationsPage };
