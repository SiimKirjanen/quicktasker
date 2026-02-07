import { __ } from "@wordpress/i18n";
import { PiWebhooksLogo } from "react-icons/pi";
import { SiProbot } from "react-icons/si";
import { useActivePipeline } from "../../../../../../hooks/useActivePipeline";
import { useNavigation } from "../../../../../../hooks/useNavigation";

function BoardOptionsSelection() {
  const { navigatePage } = useNavigation();
  const { activePipelineId } = useActivePipeline();

  return (
    <div className="wpqt-grid wpqt-grid-rows-2 wpqt-auto-cols-fr wpqt-mr-2 wpqt-pr-4 wpqt-gap-2 wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-qtBorder">
      <div
        className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
        onClick={() => {
          navigatePage(`#/board/${activePipelineId}/automations`);
        }}
      >
        <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
          {__("Automations", "quicktasker")}
        </span>
        <SiProbot className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
      </div>

      <div
        className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
        onClick={() => {
          navigatePage(`#/board/${activePipelineId}/webhooks`);
        }}
      >
        <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
          {__("Webhooks", "quicktasker")}
        </span>
        <PiWebhooksLogo className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
      </div>
    </div>
  );
}

export { BoardOptionsSelection };
