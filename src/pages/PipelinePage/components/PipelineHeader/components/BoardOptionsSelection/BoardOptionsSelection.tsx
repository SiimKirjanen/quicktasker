import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PiWebhooksLogo } from "react-icons/pi";
import { SiProbot } from "react-icons/si";
import { OPEN_EDIT_PIPELINE_MODAL } from "../../../../../../constants";
import { useActivePipeline } from "../../../../../../hooks/useActivePipeline";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { ModalContext } from "../../../../../../providers/ModalContextProvider";

function BoardOptionsSelection() {
  const { navigatePage } = useNavigation();
  const { activePipelineId, activePipeline } = useActivePipeline();
  const { modalDispatch } = useContext(ModalContext);

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
    <div className="wpqt-grid wpqt-grid-cols-[auto,auto] wpqt-mr-2 wpqt-pr-4 wpqt-gap-x-4 wpqt-gap-y-2 wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-qtBorder">
      <div
        className="wpqt-flex wpqt-gap-1 wpqt-items-center wpqt-cursor-pointer wpqt-group"
        onClick={openEditPipelineModal}
      >
        <Cog8ToothIcon className="wpqt-text-blue-400 wpqt-size-5 group-hover:wpqt-text-blue-600" />
        <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
          {__("Settings", "quicktasker")}
        </span>
      </div>

      <div
        className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
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
        className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-col-start-2 wpqt-group"
        onClick={() => {
          navigatePage(`#/board/${activePipelineId}/webhooks`);
        }}
      >
        <PiWebhooksLogo className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
        <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
          {__("Webhooks", "quicktasker")}
        </span>
      </div>
    </div>
  );
}

export { BoardOptionsSelection };
