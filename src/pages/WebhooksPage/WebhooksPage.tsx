import { ArrowPathIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { LuKeySquare } from "react-icons/lu";
import { SiProbot } from "react-icons/si";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Info } from "../../components/Info/Info";
import { LoadingOval } from "../../components/Loading/Loading";
import { NotificationsModal } from "../../components/Modal/NotificationsModal/NotificationsModal";
import { WebhookLogsModal } from "../../components/Modal/WebhookLogsModal/WebhookLogsModal";
import { NotificationsNavLink } from "../../components/NotificationsNavLink/NotificationsNavLink";
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
  const { pipelineMissing } = useMissingContent();
  const { webhooks } = useWebhooks();

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

  if (webhooks === null) {
    return null;
  }

  const isEmpty = webhooks.length === 0;

  if (isEmpty) {
    return (
      <div className="wpqt-max-w-[460px] wpqt-mx-auto wpqt-mt-12 wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-rounded-md wpqt-p-6">
        <h2 className="wpqt-mt-0">
          {__("Create a new webhook", "quicktasker")}
        </h2>
        <p>
          {__(
            "Choose which board event should trigger the webhook and the URL it will be sent to.",
            "quicktasker",
          )}
        </p>
        <WebhookCreator pipelineId={pipelineId} />
        <WebhookLogsModal />
      </div>
    );
  }

  return (
    <div className="wpqt-flex wpqt-flex-col lg:wpqt-flex-row wpqt-gap-16">
      <div className="wpqt-flex-1 wpqt-min-w-0">
        <h2>{__("Created webhooks", "quicktasker")}</h2>
        <PipelineWebhooksInfo />
        <PipelineWebhooks />
      </div>
      <div className="lg:wpqt-w-[460px] lg:wpqt-shrink-0 wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-rounded-md wpqt-p-6 wpqt-self-start">
        <h2 className="wpqt-mt-0">
          {__("Create a new webhook", "quicktasker")}
        </h2>
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
              <div className="wpqt-flex wpqt-items-center wpqt-gap-6">
                <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-mr-2 wpqt-pr-4 wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-qtBorder">
                  <div className="wpqt-flex wpqt-items-center wpqt-gap-6">
                    <div
                      className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
                      onClick={() => {
                        navigatePageWithoutHistory(`#/board/${pipelineId}`);
                      }}
                    >
                      <ViewColumnsIcon className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
                      <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
                        {__("Board", "quicktasker")}
                      </span>
                    </div>
                    <NotificationsNavLink pipelineId={pipelineId} />
                  </div>
                  <div className="wpqt-flex wpqt-items-center wpqt-gap-6">
                    <div
                      className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
                      onClick={() => {
                        navigatePageWithoutHistory(
                          `#/board/${pipelineId}/automations`,
                        );
                      }}
                    >
                      <SiProbot className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
                      <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
                        {__("Automations", "quicktasker")}
                      </span>
                    </div>
                    <div
                      className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
                      onClick={() => {
                        navigatePageWithoutHistory(
                          `#/board/${pipelineId}/api-tokens`,
                        );
                      }}
                    >
                      <LuKeySquare className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
                      <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
                        {__("API tokens", "quicktasker")}
                      </span>
                    </div>
                  </div>
                </div>
                <RefreshWebhooks />
                <PipelineSelectionDropdown
                  activePipeline={activePipeline}
                  enableActions={false}
                  onPipelineClick={(id) => {
                    navigatePageWithoutHistory(`#/board/${id}/webhooks`);
                  }}
                />
              </div>
            }
          >
            {__("Board webhooks", "quicktasker")}
          </WPQTPageHeader>
        )}
        <WebhooksPageContent pipelineId={pipelineId} />
        <NotificationsModal pipelineId={pipelineId} />
      </Page>
    </PipelineWebhooksContextProvider>
  );
}

function RefreshWebhooks() {
  const { loading, refetchPipelineWebhooks } = useWebhooks();

  return (
    <div className="wpqt-mx-5">
      {loading ? (
        <LoadingOval width="28" height="28" />
      ) : (
        <ArrowPathIcon
          className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
          data-testid="refresh-icon"
          onClick={() => refetchPipelineWebhooks()}
        />
      )}
    </div>
  );
}

export { WebhooksPage };
