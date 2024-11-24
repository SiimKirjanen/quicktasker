import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Toggle } from "../../../../../../components/common/Toggle/Toggle";
import { LoadingOval } from "../../../../../../components/Loading/Loading";
import { useSettingActions } from "../../../../../../hooks/actions/useSettingActions";
import { Settings } from "../../../Settings/Settings";

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

  const onToggle = async (checked: boolean) => {
    setChecked(checked);
    setLoading(true);
    await saveTaskCompletionDoneSetting(pipelineId, checked, (checked) => {
      setChecked(checked);
    });

    setLoading(false);
  };

  return (
    <Settings
      title={__("Restrict Task Completion", "quicktasker")}
      description={__(
        "Allow to mark task as done only on board last stage. By default, task can be marked as done on any stage.",
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
