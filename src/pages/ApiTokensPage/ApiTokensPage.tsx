import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Info } from "../../components/Info/Info";
import { Loading } from "../../components/Loading/Loading";
import { ApiTokenLogsModal } from "../../components/Modal/ApiTokenLogsModal/ApiTokenLogsModal";
import { useApiTokens } from "../../hooks/useApiTokens";
import { useApp } from "../../hooks/useApp";
import { useMissingContent } from "../../hooks/useMissingContent";
import { useNavigation } from "../../hooks/useNavigation";
import { usePipelines } from "../../hooks/usePipelines";
import { PipelineApiTokensContextProvider } from "../../providers/PipelineApiTokensContextProvider";
import { Page } from "../Page/Page";
import { PipelineApiTokenCreator } from "./components/PipelineApiTokenCreator/PipelineApiTokenCreator";
import { PipelineApiTokens } from "./components/PipelineApiTokens/PipelineApiTokens";
import { PipelineApiTokensInfo } from "./components/PipelineApiTokensInfo/PipelineApiTokensInfo";

type ApiTokensPageContentProps = {
  pipelineId: string;
};

type ApiTokensPageProps = {
  pipelineId: string;
};

function ApiTokensPageContent({ pipelineId }: ApiTokensPageContentProps) {
  const { loading } = useApiTokens();
  const { pipelineMissing } = useMissingContent();

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  if (pipelineMissing) {
    return (
      <Info
        infoDescription={__(
          "The board related to these API tokens seems to be missing. It may have been deleted.",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <div className="wpqt-flex wpqt-flex-col lg:wpqt-flex-row wpqt-gap-8">
      <div className="wpqt-flex-1 wpqt-min-w-0">
        <h2>{__("Created API tokens", "quicktasker")}</h2>
        <PipelineApiTokensInfo />
        <PipelineApiTokens />
      </div>
      <div className="lg:wpqt-w-[460px] lg:wpqt-shrink-0">
        <h2>{__("Create a new API token", "quicktasker")}</h2>
        <p>
          {__(
            "Configure permissions below. The token is displayed only once after creation.",
            "quicktasker",
          )}
        </p>
        <PipelineApiTokenCreator pipelineId={pipelineId} />
      </div>
      <ApiTokenLogsModal />
    </div>
  );
}

function ApiTokensPage({ pipelineId }: ApiTokensPageProps) {
  const { pipelines } = usePipelines();
  const { navigatePageWithoutHistory } = useNavigation();
  const { pipelineMissing } = useMissingContent();
  const {
    state: { pluginURL },
  } = useApp();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <PipelineApiTokensContextProvider pipelineId={pipelineId}>
      <Page>
        {!pipelineMissing && (
          <WPQTPageHeader
            description={__(
              "Manage the API tokens for this board. You can create, view, and delete tokens that allow external applications to access this board's data.",
              "quicktasker",
            )}
            readMoreLink={
              <a
                href={`${pluginURL}/help/index.html#api-tokens`}
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
                  navigatePageWithoutHistory(`#/board/${id}/api-tokens`);
                }}
              />
            }
          >
            {__("Board API tokens", "quicktasker")}
          </WPQTPageHeader>
        )}
        <ApiTokensPageContent pipelineId={pipelineId} />
      </Page>
    </PipelineApiTokensContextProvider>
  );
}

export { ApiTokensPage };
