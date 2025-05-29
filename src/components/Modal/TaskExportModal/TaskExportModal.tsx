import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CLOSE_TASK_EXPORT_MODAL } from "../../../constants";
import { useExportActions } from "../../../hooks/actions/useExportActions";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";

type Props = {
  pipelineId: string | null;
};
function TaskExportModal({ pipelineId }: Props) {
  const {
    state: { taskExportModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { getPipelineTasksPdf } = useExportActions();
  const [generating, setGenerating] = useState(false);

  const onPdfExportClick = async () => {
    await getPipelineTasksPdf(pipelineId);
  };

  return (
    <WPQTModal
      modalOpen={taskExportModalOpen}
      closeModal={() => {
        modalDispatch({
          type: CLOSE_TASK_EXPORT_MODAL,
        });
      }}
      size="md"
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-items-center">
        <div className="wpqt-text-lg">{__("Tasks export", "quicktasker")}</div>
        <WPQTButton
          btnText={__("Generate export", "quicktasker")}
          onClick={onPdfExportClick}
          loading={generating}
        />
      </div>
    </WPQTModal>
  );
}

export { TaskExportModal };
