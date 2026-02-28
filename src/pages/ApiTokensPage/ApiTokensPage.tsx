import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Loading } from "../../components/Loading/Loading";
import { useApiTokens } from "../../hooks/useApiTokens";
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

  if (loading) {
    return <Loading ovalSize="24" />;
  }

  return (
    <div>
      <h2>{__("Created API tokens", "quicktasker")}</h2>
      <PipelineApiTokensInfo />
      <PipelineApiTokens />
      <h2>{__("Create a new API token", "quicktasker")}</h2>
      <p>
        {__(
          "API tokens allow external applications to access this board's data. You can create a new token and specify its permissions below. After you create a token, it will be shown only once. Be sure to copy and save the token when it is displayed. The name and description are for your reference only.",
          "quicktasker",
        )}
      </p>
      <PipelineApiTokenCreator pipelineId={pipelineId} />
    </div>
  );
}

function ApiTokensPage({ pipelineId }: ApiTokensPageProps) {
  const { pipelines } = usePipelines();
  const { navigatePage } = useNavigation();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <PipelineApiTokensContextProvider pipelineId={pipelineId}>
      <Page>
        <WPQTPageHeader
          description={__(
            "Manage the API tokens for this board. You can create, view, and revoke tokens that allow external applications to access this board's data.",
            "quicktasker",
          )}
          rightSideContent={
            <PipelineSelectionDropdown
              activePipeline={activePipeline}
              enableActions={false}
              onPipelineClick={(id) => {
                navigatePage(`#/board/${id}/api-tokens`);
              }}
            />
          }
        >
          {__("Board API tokens", "quicktasker")}
        </WPQTPageHeader>
        <ApiTokensPageContent pipelineId={pipelineId} />
      </Page>
    </PipelineApiTokensContextProvider>
  );
}

export { ApiTokensPage };
