import { SiProbot } from "react-icons/si";
import { useActivePipeline } from "../../../../../../hooks/useActivePipeline";
import { useNavigation } from "../../../../../../hooks/useNavigation";

function BoardOptionsSelection() {
  const { navigatePage } = useNavigation();
  const { activePipelineId } = useActivePipeline();

  return (
    <div className="wpqt-flex wpqt-mr-2">
      <SiProbot
        className="wpqt-size-5 wpqt-cursor-pointer wpqt-icon-blue"
        onClick={() => {
          navigatePage(`#/board/${activePipelineId}/automations`);
        }}
      />
    </div>
  );
}

export { BoardOptionsSelection };
