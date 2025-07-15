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

import { getModalCtaBtnText } from "./export-modal-utils/export-modal-utils";
import { PipelineExportTypeSelection } from "./PipelineExportTypeSelection/PipelineExportTypeSelection";

type Props = {
  pipelineId: string | null;
};
function PipelineExportModal({ pipelineId }: Props) {
  const {
    state: { taskExportModalOpen, taskExportModalSettings },
    modalDispatch,
  } = useContext(ModalContext);
  const {
    state: { siteURL },
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [includeArchived, setIncludeArchived] = useState(false);
  const [includePipelineCustomFields, setIncludePipelineCustomFields] =
    useState(true);

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
        <PipelineExportTypeSelection />

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

        <div className="wpqt-flex wpqt-flex-col wpqt-items-center">
          <WPQTLabel labelFor="export-include-archive-filter">
            {__("Include board custom fields", "quicktasker")}
          </WPQTLabel>
          <Toggle
            checked={includePipelineCustomFields}
            handleChange={setIncludePipelineCustomFields}
            id="export-include-task-custom-fields-filter"
          />
        </div>

        <WPQTButton
          btnText={getModalCtaBtnText(taskExportModalSettings.selectedMethod)}
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
        <input
          type="hidden"
          name="include_custom_fields"
          value={includePipelineCustomFields ? "1" : "0"}
        />
      </form>
    </WPQTModal>
  );
}

export { PipelineExportModal };
