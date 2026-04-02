import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PIPELINE_EDIT_SETTINGS } from "../../../../../constants";
import { useSettingActions } from "../../../../../hooks/actions/useSettingActions";
import { ActivePipelineContext } from "../../../../../providers/ActivePipelineContextProvider";
import { AutoSaveInput } from "../../../../common/Input/AutoSaveInput/AutoSaveInput";
import { Settings } from "../Setting/Settings";

type Props = {
  pipelineId: string;
  pipelineRefreshInterval: number;
};
function PipelineRefreshIntervalSetting({
  pipelineId,
  pipelineRefreshInterval,
}: Props) {
  const { savePipelineSettings } = useSettingActions();
  const { dispatch } = useContext(ActivePipelineContext);

  const intervalChange = async (value: string) => {
    const refreshInterval = parseInt(value, 10);
    const { success } = await savePipelineSettings(pipelineId, {
      pipeline_refresh_interval: refreshInterval,
    });

    if (success) {
      dispatch({
        type: PIPELINE_EDIT_SETTINGS,
        payload: {
          pipeline_refresh_interval: refreshInterval,
        },
      });
    }
  };

  return (
    <Settings
      title={__("Board refresh interval", "quicktasker")}
      description={__(
        "Set how often the board automatically refreshes (in seconds).",
        "quicktasker",
      )}
    >
      <div className="wpqt-flex wpqt-gap-2 wpqt-items-center">
        <AutoSaveInput
          value={pipelineRefreshInterval.toString()}
          onChange={intervalChange}
        />
      </div>
    </Settings>
  );
}

export { PipelineRefreshIntervalSetting };
