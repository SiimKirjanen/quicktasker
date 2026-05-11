import { ArrowPathIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { LuKeySquare } from "react-icons/lu";
import { PiWebhooksLogo } from "react-icons/pi";
import { SiProbot } from "react-icons/si";
import { getPipelineOverviewData } from "../../api/api";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { LoadingOval } from "../../components/Loading/Loading";
import { NotificationsModal } from "../../components/Modal/NotificationsModal/NotificationsModal";
import { NotificationsNavLink } from "../../components/NotificationsNavLink/NotificationsNavLink";
import { useMissingContent } from "../../hooks/useMissingContent";
import { useMissingResourceDetection } from "../../hooks/useMissingResourceDetection";
import { useNavigation } from "../../hooks/useNavigation";
import { usePipelines } from "../../hooks/usePipelines";
import { PipelineOverviewResponse } from "../../types/requestResponse/pipeline-overview-response";
import { Page } from "../Page/Page";
import { PipelineOverview } from "./components/PipelineOverview/PipelineOverview";

type Props = {
  pipelineId: string;
};

function OverviewPage({ pipelineId }: Props) {
  const { pipelines } = usePipelines();
  const { navigatePageWithoutHistory } = useNavigation();
  const { pipelineMissing } = useMissingContent();
  const { detectMissingResources } = useMissingResourceDetection();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  const [pipelineOverviewData, setPipelineOverviewData] =
    useState<PipelineOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPipelineOverview = async () => {
    try {
      setLoading(true);
      const response = await getPipelineOverviewData(pipelineId);
      setPipelineOverviewData(response.data);
    } catch (error) {
      console.error(error);
      detectMissingResources(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelineOverview();
  }, [pipelineId]);

  return (
    <Page>
      {!pipelineMissing && (
        <WPQTPageHeader
          description={__("Get overview of the board.", "quicktasker")}
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
                  <NotificationsNavLink />
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
                        `#/board/${pipelineId}/webhooks`,
                      );
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
                </div>
              </div>
              <div className="wpqt-mx-5">
                {loading ? (
                  <LoadingOval width="28" height="28" />
                ) : (
                  <ArrowPathIcon
                    className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
                    data-testid="refresh-icon"
                    onClick={() => fetchPipelineOverview()}
                  />
                )}
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
      <PipelineOverview pipelineOverviewData={pipelineOverviewData} />
      <NotificationsModal />
    </Page>
  );
}

export { OverviewPage };
