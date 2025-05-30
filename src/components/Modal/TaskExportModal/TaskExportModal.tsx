import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CLOSE_TASK_EXPORT_MODAL } from "../../../constants";
import { AppContext } from "../../../providers/AppContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { ButtonType, WPQTButton } from "../../common/Button/Button";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTLabel } from "../../common/Label/WPQTLabel";
import { Toggle } from "../../common/Toggle/Toggle";
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
  const [search, setSearch] = useState("");
  const [includeArchived, setIncludeArchived] = useState(false);

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
        className="wpqt-flex wpqt-flex-col wpqt-gap-3 wpqt-items-center"
        action={siteURL}
        target="_blank"
        method="GET"
      >
        <div className="wpqt-text-lg">{__("Tasks export", "quicktasker")}</div>
        <div className="wpqt-flex wpqt-flex-col wpqt-items-center">
          <WPQTLabel labelFor="export-search-filter">
            {__("Filter by task name and desription", "quicktasker")}
          </WPQTLabel>
          <WPQTInput
            value={search}
            onChange={setSearch}
            inputId="export-search-filter"
            name="task_search"
            wrapperClassName="wpqt-mb-0"
          />
        </div>

        <div className="wpqt-flex wpqt-flex-col wpqt-items-center">
          <WPQTLabel labelFor="export-include-archive-filter">
            {__("Include board archived tasks", "quicktasker")}
          </WPQTLabel>
          <Toggle
            checked={includeArchived}
            handleChange={setIncludeArchived}
            id="export-include-archive-filter"
          />
        </div>

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
        <input
          type="hidden"
          name="include_archive"
          value={includeArchived ? "1" : "0"}
        />
      </form>
    </WPQTModal>
  );
}

export { TaskExportModal };
