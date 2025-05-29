import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CLOSE_TASK_EXPORT_MODAL } from "../../../constants";
import { AppContext } from "../../../providers/AppContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { ButtonType, WPQTButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";

type Props = {
  pipelineId: string | null;
};
function TaskExportModal({ pipelineId }: Props) {
  const {
    state: { taskExportModalOpen, taskExportModalSettings },
    modalDispatch,
  } = useContext(ModalContext);
  const {
    state: { siteURL },
  } = useContext(AppContext);

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
      <form
        className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-items-center"
        action={siteURL}
        target="_blank"
        method="GET"
      >
        <div className="wpqt-text-lg">{__("Tasks export", "quicktasker")}</div>
        <WPQTButton
          btnText={__("Open export", "quicktasker")}
          type={ButtonType.SUBMIT}
        />
        {pipelineId && (
          <input type="hidden" name="pipeline_id" value={pipelineId} />
        )}
        <input
          type="hidden"
          name="wpqt-page"
          value={`${taskExportModalSettings.selectedMethod}-export`}
        />
      </form>
    </WPQTModal>
  );
}

export { TaskExportModal };
