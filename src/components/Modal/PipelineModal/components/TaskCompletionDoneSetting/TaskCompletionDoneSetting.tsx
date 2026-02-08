import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PIPELINE_EDIT_SETTINGS } from "../../../../../constants";
import { useSettingActions } from "../../../../../hooks/actions/useSettingActions";
import { ActivePipelineContext } from "../../../../../providers/ActivePipelineContextProvider";
import { Toggle } from "../../../../common/Toggle/Toggle";
import { LoadingOval } from "../../../../Loading/Loading";
import { Settings } from "../Setting/Settings";

type Props = {
  allow_only_last_stage_task_done: boolean;
  pipelineId: string;
};
function TaskCompletionDoneSetting({
  allow_only_last_stage_task_done,
  pipelineId,
}: Props) {
  const [checked, setChecked] = useState(allow_only_last_stage_task_done);
  const [loading, setLoading] = useState(false);
  const { saveTaskCompletionDoneSetting } = useSettingActions();
  const { dispatch } = useContext(ActivePipelineContext);

  const onToggle = async (checked: boolean) => {
    setChecked(checked);
    setLoading(true);
    const { success } = await saveTaskCompletionDoneSetting(
      pipelineId,
      checked,
    );
    setLoading(false);

    if (success) {
      dispatch({
        type: PIPELINE_EDIT_SETTINGS,
        payload: {
          allow_only_last_stage_task_done: checked,
        },
      });
    } else {
      setChecked(!checked);
    }
  };

  return (
    <Settings
      title={__("Restrict Task Completion", "quicktasker")}
      description={__(
        "Allow to mark task as done only on board last stage. By default, task can be marked as done on any stage. Will apply also to QuickTasker page.",
        "quicktasker",
      )}
    >
      <div className="wpqt-flex wpqt-gap-2 wpqt-items-center">
        <Toggle checked={checked} handleChange={onToggle} />
        {loading && <LoadingOval width="20" height="20" />}
      </div>
    </Settings>
  );
}

export { TaskCompletionDoneSetting };
