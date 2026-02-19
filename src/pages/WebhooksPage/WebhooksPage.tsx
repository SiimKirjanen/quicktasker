import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Loading } from "../../components/Loading/Loading";
import { WebhookLogsModal } from "../../components/Modal/WebhookLogsModal/WebhookLogsModal";
import { useNavigation } from "../../hooks/useNavigation";
import { usePipelines } from "../../hooks/usePipelines";
import { useWebhooks } from "../../hooks/useWebhooks";
import { PipelineWebhooksContextProvider } from "../../providers/PipelineWebhooksContextProvider";
import { Page } from "../Page/Page";
import { PipelineWebhooks } from "./components/PipelineWebhooks/PipelineWebhooks";
import { PipelineWebhooksInfo } from "./components/PipelineWebhooksInfo/PipelineWebhooksInfo";
import { WebhookCreator } from "./components/WebhookCreator/WebhookCreator";

type Props = {
  pipelineId: string;
};

function WebhooksPageContent({ pipelineId }: Props) {
  const { loading } = useWebhooks();

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  return (
    <div>
      <h2>{__("Created webhooks", "quicktasker")}</h2>
      <PipelineWebhooksInfo />
      <PipelineWebhooks />
      <h2>{__("Create a new webhook", "quicktasker")}</h2>
      <WebhookCreator pipelineId={pipelineId} />
      <WebhookLogsModal />
    </div>
  );
}

function WebhooksPage({ pipelineId }: Props) {
  console.log(pipelineId);
  const { pipelines } = usePipelines();
  const { navigatePage } = useNavigation();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <PipelineWebhooksContextProvider pipelineId={pipelineId}>
      <Page>
        <WPQTPageHeader
          description={__(
            "Send real-time board event data to external services using webhooks.",
            "quicktasker",
          )}
          rightSideContent={
            <PipelineSelectionDropdown
              activePipeline={activePipeline}
              enableActions={false}
              onPipelineClick={(id) => {
                navigatePage(`#/board/${id}/webhooks`);
              }}
            />
          }
        >
          {__("Board webhooks", "quicktasker")}
        </WPQTPageHeader>
        <WebhooksPageContent pipelineId={pipelineId} />
      </Page>
    </PipelineWebhooksContextProvider>
  );
}

export { WebhooksPage };
