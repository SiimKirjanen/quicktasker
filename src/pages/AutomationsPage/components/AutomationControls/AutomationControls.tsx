import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTControls } from "../../../../components/Card/WPQTControls/WPQTControls";
import {
  OPEN_AUTOMATION_LOGS_MODAL,
  REMOVE_PIPELINE_AUTOMATION,
  UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
} from "../../../../constants";
import { useAutomationActions } from "../../../../hooks/actions/useAutomationActions";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { PipelineAutomationsContext } from "../../../../providers/PipelineAutomationsContextProvider";
import { Automation } from "../../../../types/automation";

type Props = {
  automation: Automation;
  className?: string;
  titleClassName?: string;
};
function AutomationControls({ automation }: Props) {
  const { deleteAutomation, updateAutomationActiveStatus } =
    useAutomationActions();
  const { pipelineAutomationsDispatch } = useContext(
    PipelineAutomationsContext,
  );
  const { modalDispatch } = useContext(ModalContext);
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
    <WPQTControls
      title={__("Controls", "quicktasker")}
      activateLoading={activateLoading}
      active={automation.active}
      deleteLoading={deleteLoading}
      onDelete={onDelete}
      onActiveChange={onActiveChange}
      deleteConfirmMessage={__(
        "Are you sure you want to delete this automation?",
        "quicktasker",
      )}
      openLogs={() => {
        modalDispatch({
          type: OPEN_AUTOMATION_LOGS_MODAL,
          payload: { automationId: automation.id },
        });
      }}
    />
  );
}

export { AutomationControls };
