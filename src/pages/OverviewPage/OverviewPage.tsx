import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { LuKeySquare } from "react-icons/lu";
import { PiWebhooksLogo } from "react-icons/pi";
import { SiProbot } from "react-icons/si";
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
                  navigatePageWithoutHistory(`#/board/${pipelineId}/webhooks`);
                }}
              >
                <PiWebhooksLogo className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
                <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
                  {__("Webhooks", "quicktasker")}
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
              <PipelineSelectionDropdown
                activePipeline={activePipeline}
                enableActions={false}
                onPipelineClick={(id) => {
                  navigatePageWithoutHistory(`#/board/${id}/overview`);
                }}
              />
            </div>
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
