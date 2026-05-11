import { ArrowPathIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { LuKeySquare } from "react-icons/lu";
import { PiWebhooksLogo } from "react-icons/pi";
import { WPQTPageHeader } from "../../components/common/Header/Header";

import { PipelineSelectionDropdown } from "../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { Info } from "../../components/Info/Info";
import { LoadingOval } from "../../components/Loading/Loading";
import { AutomationLogsModal } from "../../components/Modal/AutomationLogsModal/AutomationLogsModal";
import { NotificationsModal } from "../../components/Modal/NotificationsModal/NotificationsModal";
import { NotificationsNavLink } from "../../components/NotificationsNavLink/NotificationsNavLink";
import { useAutomations } from "../../hooks/useAutomations";
import { useMissingContent } from "../../hooks/useMissingContent";
import { useNavigation } from "../../hooks/useNavigation";
import { usePipelines } from "../../hooks/usePipelines";
import { PipelineAutomationsContextProvider } from "../../providers/PipelineAutomationsContextProvider";
import { Page } from "../Page/Page";
import { AutomationCreator } from "./components/AutomationCreator/AutomationCreator";
import { PipelineAutomations } from "./components/PipelineAutomations/PipelineAutomations";
import { PipelineAutomationsInfo } from "./components/PipelineAutomationsInfo/PipelineAutomationsInfo";

type Props = {
  pipelineId: string;
};

function AutomationsPageContent({ pipelineId }: Props) {
  const { pipelineMissing } = useMissingContent();
  const { automations } = useAutomations();

  if (pipelineMissing) {
    return (
      <Info
        infoDescription={__(
          "The board related to these automations seems to be missing. It may have been deleted.",
          "quicktasker",
        )}
      />
    );
  }

  if (automations === null) {
    return null;
  }

  const isEmpty = automations.length === 0;

  if (isEmpty) {
    return (
      <div className="wpqt-max-w-[460px] wpqt-mx-auto wpqt-mt-12 wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-rounded-md wpqt-p-6">
        <h2 className="wpqt-mt-0">
          {__("Create a new automation", "quicktasker")}
        </h2>
        <p>
          {__("Follow the steps to create a new automation.", "quicktasker")}
        </p>
        <AutomationCreator pipelineId={pipelineId} />
        <AutomationLogsModal />
      </div>
    );
  }

  return (
    <div className="wpqt-flex wpqt-flex-col lg:wpqt-flex-row wpqt-gap-16">
      <div className="wpqt-flex-1 wpqt-min-w-0">
        <h2>{__("Created automations", "quicktasker")}</h2>
        <PipelineAutomationsInfo />
        <PipelineAutomations />
      </div>
      <div className="lg:wpqt-w-[460px] lg:wpqt-shrink-0 wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-rounded-md wpqt-p-6 wpqt-self-start">
        <h2 className="wpqt-mt-0">
          {__("Create a new automation", "quicktasker")}
        </h2>
        <p>
          {__("Follow the steps to create a new automation.", "quicktasker")}
        </p>
        <AutomationCreator pipelineId={pipelineId} />
      </div>
      <AutomationLogsModal />
    </div>
  );
}

function AutomationsPage({ pipelineId }: Props) {
  const { pipelines } = usePipelines();
  const { navigatePageWithoutHistory } = useNavigation();
  const { pipelineMissing } = useMissingContent();
  const activePipeline =
    pipelines.find((pipeline) => pipeline.id === pipelineId) || null;

  return (
    <PipelineAutomationsContextProvider pipelineId={pipelineId}>
      <Page>
        {!pipelineMissing && (
          <WPQTPageHeader
            description={__(
              "Set up automated processes to help manage your board.",
              "quicktasker",
            )}
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
                <RefreshAutomations />
                <PipelineSelectionDropdown
                  activePipeline={activePipeline}
                  enableActions={false}
                  onPipelineClick={(id) => {
                    navigatePageWithoutHistory(`#/board/${id}/automations`);
                  }}
                />
              </div>
            }
          >
            {__("Board automations", "quicktasker")}
          </WPQTPageHeader>
        )}
        <AutomationsPageContent pipelineId={pipelineId} />
        <NotificationsModal pipelineId={pipelineId} />
      </Page>
    </PipelineAutomationsContextProvider>
  );
}

function RefreshAutomations() {
  const { loading, refetchPipelineAutomations } = useAutomations();

  return (
    <div className="wpqt-mx-5">
      {loading ? (
        <LoadingOval width="28" height="28" />
      ) : (
        <ArrowPathIcon
          className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
          data-testid="refresh-icon"
          onClick={() => refetchPipelineAutomations()}
        />
      )}
    </div>
  );
}

export { AutomationsPage };
