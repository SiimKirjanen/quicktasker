import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
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
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <Page>
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
      {activePipeline && <PipelineOverview pipeline={activePipeline} />}
    </Page>
  );
}

export { OverviewPage };
