import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Info } from "../../components/Info/Info";
import { Loading } from "../../components/Loading/Loading";
import { WebhookLogsModal } from "../../components/Modal/WebhookLogsModal/WebhookLogsModal";
import { useApp } from "../../hooks/useApp";
import { useMissingContent } from "../../hooks/useMissingContent";
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
  const { pipelineMissing } = useMissingContent();

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  if (pipelineMissing) {
    return (
      <Info
        infoDescription={__(
          "The board related to these webhooks seems to be missing. It may have been deleted.",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <div className="wpqt-flex wpqt-flex-col lg:wpqt-flex-row wpqt-gap-8">
      <div className="wpqt-flex-1 wpqt-min-w-0">
        <h2>{__("Created webhooks", "quicktasker")}</h2>
        <PipelineWebhooksInfo />
        <PipelineWebhooks />
      </div>
      <div className="lg:wpqt-w-[460px] lg:wpqt-shrink-0">
        <h2>{__("Create a new webhook", "quicktasker")}</h2>
        <p>
          {__(
            "Choose which board event should trigger the webhook and the URL it will be sent to.",
            "quicktasker",
          )}
        </p>
        <WebhookCreator pipelineId={pipelineId} />
      </div>
      <WebhookLogsModal />
    </div>
  );
}

function WebhooksPage({ pipelineId }: Props) {
  const { pipelines } = usePipelines();
  const { navigatePageWithoutHistory } = useNavigation();
  const { pipelineMissing } = useMissingContent();
  const {
    state: { pluginURL },
  } = useApp();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <PipelineWebhooksContextProvider pipelineId={pipelineId}>
      <Page>
        {!pipelineMissing && (
          <WPQTPageHeader
            description={__(
              "Send real-time board event data to external services using webhooks.",
              "quicktasker",
            )}
            readMoreLink={
              <a
                href={`${pluginURL}/help/index.html#webhooks`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {__("Read more", "quicktasker")}
              </a>
            }
            rightSideContent={
              <PipelineSelectionDropdown
                activePipeline={activePipeline}
                enableActions={false}
                onPipelineClick={(id) => {
                  navigatePageWithoutHistory(`#/board/${id}/webhooks`);
                }}
              />
            }
          >
            {__("Board webhooks", "quicktasker")}
          </WPQTPageHeader>
        )}
        <WebhooksPageContent pipelineId={pipelineId} />
      </Page>
    </PipelineWebhooksContextProvider>
  );
}

export { WebhooksPage };
