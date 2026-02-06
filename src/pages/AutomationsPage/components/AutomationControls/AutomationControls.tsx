import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { Loading } from "../../../../components/Loading/Loading";
import { WPQTIconButton } from "../../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import {
  REMOVE_PIPELINE_AUTOMATION,
  UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
} from "../../../../constants";
import { useAutomationActions } from "../../../../hooks/actions/useAutomationActions";
import { PipelineAutomationsContext } from "../../../../providers/PipelineAutomationsContextProvider";
import { Automation } from "../../../../types/automation";

type Props = {
  automation: Automation;
  className?: string;
  titleClassName?: string;
};
function AutomationControls({
  automation,
  className = "",
  titleClassName = "",
}: Props) {
  const { deleteAutomation, updateAutomationActiveStatus } =
    useAutomationActions();
  const { pipelineAutomationsDispatch } = useContext(
    PipelineAutomationsContext,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false);

  const onDelete = async () => {
    setDeleteLoading(true);
    await deleteAutomation(automation.pipeline_id, automation.id, (success) => {
      if (success) {
        pipelineAutomationsDispatch({
          type: REMOVE_PIPELINE_AUTOMATION,
          payload: automation.id,
        });
      }
    });
    setDeleteLoading(false);
  };

  const onActiveChange = async (active: boolean) => {
    setActivateLoading(true);
    const status = await updateAutomationActiveStatus(
      automation.pipeline_id,
      automation.id,
      active,
    );
    setActivateLoading(false);

    if (status.success) {
      pipelineAutomationsDispatch({
        type: UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
        payload: {
          id: automation.id,
          active,
        },
      });
    }
  };

  return (
    <WPQTCard
      title={__("Controls", "quicktasker")}
      className={`${className} wpqt-ml-6`}
      titleClassName={titleClassName}
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3 wpqt-justify-center">
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-1 wpqt-justify-center wpqt-items-center wpqt-h-[40px]">
          {activateLoading ? (
            <Loading ovalSize="32" />
          ) : (
            <>
              <span className="wpqt-font-semibold">
                {__("Active", "quicktasker")}
              </span>
              <Toggle
                checked={automation.active}
                handleChange={onActiveChange}
              />
            </>
          )}
        </div>
        <div className="wpqt-flex wpqt-gap-2">
          <WPQTIconButton
            loading={deleteLoading}
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
            onClick={onDelete}
            text={__("Delete", "quicktasker")}
          />
        </div>
      </div>
    </WPQTCard>
  );
}

export { AutomationControls };
