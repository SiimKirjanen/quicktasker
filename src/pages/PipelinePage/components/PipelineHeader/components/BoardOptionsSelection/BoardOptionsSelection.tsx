import {
  Cog8ToothIcon,
  RectangleStackIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { IoStatsChartOutline } from "react-icons/io5";
import { LuKeySquare } from "react-icons/lu";
import { PiWebhooksLogo } from "react-icons/pi";
import { SiProbot } from "react-icons/si";
import { NotificationsNavLink } from "../../../../../../components/NotificationsNavLink/NotificationsNavLink";
import {
  OPEN_EDIT_PIPELINE_MODAL,
  PIPELINE_TOGGLE_VIEW,
} from "../../../../../../constants";
import { useActivePipeline } from "../../../../../../hooks/useActivePipeline";
import { useApp } from "../../../../../../hooks/useApp";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { ActivePipelineContext } from "../../../../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../../../../providers/ModalContextProvider";
import { PipelineView } from "../../../../../../types/pipeline";

function BoardOptionsSelection() {
  const { navigatePage } = useNavigation();
  const { activePipelineId, activePipeline } = useActivePipeline();
  const { modalDispatch } = useContext(ModalContext);
  const {
    state: { view },
    dispatch,
  } = useContext(ActivePipelineContext);
  const {
    state: { isUserAllowedToManageSettings },
  } = useApp();

  const toggleView = () => {
    dispatch({
      type: PIPELINE_TOGGLE_VIEW,
      payload:
        view === PipelineView.PIPELINE
          ? PipelineView.TASK
          : PipelineView.PIPELINE,
    });
  };

  const openEditPipelineModal = () => {
    if (!activePipeline) {
      return;
    }
    modalDispatch({
      type: OPEN_EDIT_PIPELINE_MODAL,
      payload: {
        pipelineToEdit: activePipeline,
      },
    });
  };

  return (
    <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-x-4 wpqt-gap-y-2 sm:wpqt-grid sm:wpqt-grid-cols-[auto,auto,auto,auto] sm:wpqt-gap-x-0 xl:wpqt-mr-2 xl:wpqt-pr-4 xl:wpqt-border-0 xl:wpqt-border-r xl:wpqt-border-solid xl:wpqt-border-qtBorder">
      <div
        className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
        onClick={() => {
          navigatePage(`#/board/${activePipelineId}/overview`);
        }}
      >
        <IoStatsChartOutline className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
        <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
          {__("Overview", "quicktasker")}
        </span>
      </div>

      <div className="sm:wpqt-pl-4">
        {activePipelineId && <NotificationsNavLink />}
      </div>

      <div
        className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 sm:wpqt-pl-4 wpqt-group"
        onClick={toggleView}
      >
        {view === PipelineView.PIPELINE ? (
          <>
            <RectangleStackIcon className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("Task view", "quicktasker")}
            </span>
          </>
        ) : (
          <>
            <ViewColumnsIcon className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("Board view", "quicktasker")}
            </span>
          </>
        )}
      </div>

      {isUserAllowedToManageSettings && (
        <>
          <div
            className="wpqt-flex wpqt-gap-1 wpqt-items-center wpqt-cursor-pointer sm:wpqt-pl-4 wpqt-group"
            onClick={openEditPipelineModal}
          >
            <Cog8ToothIcon className="wpqt-text-blue-400 wpqt-size-5 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("Settings", "quicktasker")}
            </span>
          </div>

          <div
            className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-col-start-1 wpqt-group"
            onClick={() => {
              navigatePage(`#/board/${activePipelineId}/automations`);
            }}
          >
            <SiProbot className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("Automations", "quicktasker")}
            </span>
          </div>

          <div
            className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 sm:wpqt-pl-4 wpqt-group"
            onClick={() => {
              navigatePage(`#/board/${activePipelineId}/webhooks`);
            }}
          >
            <PiWebhooksLogo className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("Webhooks", "quicktasker")}
            </span>
          </div>

          <div
            className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 sm:wpqt-pl-4 wpqt-group"
            onClick={() => {
              navigatePage(`#/board/${activePipelineId}/api-tokens`);
            }}
          >
            <LuKeySquare className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("API tokens", "quicktasker")}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export { BoardOptionsSelection };
