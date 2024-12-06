import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { PIPELINE_REMOVE_TASK } from "../../constants";
import { ActivePipelineContext } from "../../providers/ActivePipelineContextProvider";
import { Automation, AutomationAction } from "../../types/automation";

const actionMessages: { [key in AutomationAction]: string } = {
  [AutomationAction.ARCHIVE_TASK]: __(
    "Task archived by automation",
    "quicktasker",
  ),
};

function useAutomationActions() {
  const { dispatch } = useContext(ActivePipelineContext);

  const displayAutomationMessages = (executedAutomations: Automation[]) => {
    executedAutomations.forEach((automation) => {
      const message =
        actionMessages[automation.automation_action] ||
        `Automation executed: ${automation.automation_action}`;

      toast.info(message);
    });
  };

  const handleExecutedAnimationsResults = (
    executedAutomations: Automation[],
    triggererId: string,
  ) => {
    executedAutomations.forEach((automation) => {
      if (automation.automation_action === AutomationAction.ARCHIVE_TASK) {
        dispatch({
          type: PIPELINE_REMOVE_TASK,
          payload: triggererId,
        });
      }
    });
  };

  const handleExecutedAutomations = (
    executedAutomations: Automation[],
    triggererId: string,
  ) => {
    if (executedAutomations.length === 0) {
      return;
    }
    handleExecutedAnimationsResults(executedAutomations, triggererId);
    displayAutomationMessages(executedAutomations);
  };

  return {
    displayAutomationMessages,
    handleExecutedAnimationsResults,
    handleExecutedAutomations,
  };
}

export { useAutomationActions };
