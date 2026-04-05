import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { useMissingContent } from "../../hooks/useMissingContent";
import { useNavigation } from "../../hooks/useNavigation";
import { usePipelines } from "../../hooks/usePipelines";
import { Page } from "../Page/Page";
import { PipelineOverview } from "./components/PipelineOverview/PipelineOverview";

type Props = {
  pipelineId: string;
};

function OverviewPage({ pipelineId }: Props) {
  const { pipelines } = usePipelines();
  const { navigatePageWithoutHistory } = useNavigation();
  const { pipelineMissing } = useMissingContent();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <Page>
      {!pipelineMissing && (
        <WPQTPageHeader
          description={__("Get overview of the board.", "quicktasker")}
          rightSideContent={
            <PipelineSelectionDropdown
              activePipeline={activePipeline}
              enableActions={false}
              onPipelineClick={(id) => {
                navigatePageWithoutHistory(`#/board/${id}/overview`);
              }}
            />
          }
        >
          {__("Overview", "quicktasker")}
        </WPQTPageHeader>
      )}
      <PipelineOverview pipelineId={pipelineId} />
    </Page>
  );
}

export { OverviewPage };
