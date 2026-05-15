import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSettingActions } from "../../../../../hooks/actions/useSettingActions";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { AutoSaveInput } from "../../../../common/Input/AutoSaveInput/AutoSaveInput";
import { Toggle } from "../../../../common/Toggle/Toggle";
import { LoadingOval } from "../../../../Loading/Loading";
import { Settings } from "../Setting/Settings";

type Props = {
  pipelineId: string;
  allowPublicTaskCreation: boolean;
  publicTaskCreationLimit: number;
  publicTaskCreationCount: number;
  requireLoggedInUser: boolean;
};

function PublicTaskSubmissionsSetting({
  pipelineId,
  allowPublicTaskCreation,
  publicTaskCreationLimit,
  publicTaskCreationCount,
  requireLoggedInUser,
}: Props) {
  const [enabled, setEnabled] = useState(allowPublicTaskCreation);
  const [limit, setLimit] = useState(publicTaskCreationLimit);
  const [count, setCount] = useState(publicTaskCreationCount);
  const [requireLogin, setRequireLogin] = useState(requireLoggedInUser);
  const [toggling, setToggling] = useState(false);
  const [togglingLogin, setTogglingLogin] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { savePipelineSettings } = useSettingActions();

  const onToggle = async (checked: boolean) => {
    setEnabled(checked);
    setToggling(true);
    const shouldSeedLimit = checked && limit === 0;
    const { success } = await savePipelineSettings(pipelineId, {
      allow_public_task_creation: checked,
      ...(shouldSeedLimit ? { public_task_creation_limit: 50 } : {}),
    });
    setToggling(false);

    if (success) {
      if (shouldSeedLimit) {
        setLimit(50);
      }
    } else {
      setEnabled(!checked);
    }
  };

  const onLimitChange = async (value: string) => {
    const next = Math.max(1, parseInt(value, 10) || 1);
    setLimit(next);
    await savePipelineSettings(pipelineId, {
      public_task_creation_limit: next,
    });
  };

  const onRequireLoginToggle = async (checked: boolean) => {
    setRequireLogin(checked);
    setTogglingLogin(true);
    const { success } = await savePipelineSettings(pipelineId, {
      require_logged_in_user: checked,
    });
    setTogglingLogin(false);
    if (!success) {
      setRequireLogin(!checked);
    }
  };

  const onReset = async () => {
    setResetting(true);
    const { success } = await savePipelineSettings(pipelineId, {
      public_task_creation_count: 0,
    });
    if (success) {
      setCount(0);
    }
    setResetting(false);
  };

  return (
    <Settings
      title={__("Public task submissions", "quicktasker")}
      description={__(
        "Allow website visitors to submit tasks into this board via the QuickTasker block on pages/posts.",
        "quicktasker",
      )}
    >
      <div className="wpqt-flex wpqt-gap-2 wpqt-items-center wpqt-mb-2">
        <Toggle
          checked={enabled}
          handleChange={onToggle}
          dataTestId="public-task-submissions-toggle"
        />
        {toggling && <LoadingOval width="20" height="20" />}
      </div>
      {enabled && (
        <div className="wpqt-pl-3 wpqt-border-0 wpqt-border-l-2 wpqt-border-solid wpqt-border-gray-200">
          <div className="wpqt-mb-2">
            <h5 className="wpqt-m-0 wpqt-mb-1">
              {__("Require logged-in WordPress user", "quicktasker")}
            </h5>
            <p className="wpqt-mt-0">
              {__(
                "When enabled, only logged-in WordPress users can submit tasks via the block.",
                "quicktasker",
              )}
            </p>
            <div className="wpqt-flex wpqt-gap-2 wpqt-items-center">
              <Toggle
                checked={requireLogin}
                handleChange={onRequireLoginToggle}
                dataTestId="public-task-submissions-require-login-toggle"
              />
              {togglingLogin && <LoadingOval width="20" height="20" />}
            </div>
          </div>
          <div className="wpqt-mb-2">
            <h5 className="wpqt-m-0 wpqt-mb-1">
              {__("Max submissions", "quicktasker")}
            </h5>
            <p className="wpqt-mt-0">
              {__(
                "Public submissions are blocked once the counter reaches this value. Reset the counter to allow more.",
                "quicktasker",
              )}
            </p>
            <AutoSaveInput value={limit.toString()} onChange={onLimitChange} />
          </div>
          <div>
            <h5 className="wpqt-m-0 wpqt-mb-1">
              {__("Submissions so far:", "quicktasker")} {count}
            </h5>
            <p className="wpqt-mt-0">
              {__(
                "Public submissions counted toward the current limit. Reset to clear it and start counting from zero again.",
                "quicktasker",
              )}
            </p>
            <div className="wpqt-flex wpqt-gap-2 wpqt-items-center">
              <WPQTButton
                btnText={__("Reset counter", "quicktasker")}
                onClick={onReset}
                disabled={resetting || count === 0}
                buttonStyleType={ButtonStyleType.SECONDARY}
                icon={<ArrowPathIcon className="wpqt-size-4" />}
              />
              {resetting && <LoadingOval width="20" height="20" />}
            </div>
          </div>
        </div>
      )}
    </Settings>
  );
}

export { PublicTaskSubmissionsSetting };
