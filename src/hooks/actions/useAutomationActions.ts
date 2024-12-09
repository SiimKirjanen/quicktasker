import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  createPipelineAutomationRequest,
  deletePipelineAutomationsRequest,
} from "../../api/api";
import { PIPELINE_REMOVE_TASK } from "../../constants";
import { ActivePipelineContext } from "../../providers/ActivePipelineContextProvider";
import { AutomationCreationState } from "../../reducers/automation-creation-reducer";
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

  const createAutomation = async (
    pipelineId: string,
    automation: AutomationCreationState,
    callback?: (success: boolean, createdAutomation: Automation | null) => void,
  ) => {
    try {
      const response = await createPipelineAutomationRequest(
        pipelineId,
        automation,
      );
      toast.success(__("Automation created", "quicktasker"));
      callback && callback(true, response.data);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to create automation", "quicktasker"));

      callback && callback(false, null);
    }
  };

  const deleteAutomation = async (
    pipelineId: string,
    automationId: string,
    callback?: (success: boolean) => void,
  ) => {
    try {
      await deletePipelineAutomationsRequest(pipelineId, automationId);
      toast.success(__("Automation deleted", "quicktasker"));
      callback && callback(true);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to delete automation", "quicktasker"));
      callback && callback(false);
    }
  };

  return {
    displayAutomationMessages,
    handleExecutedAnimationsResults,
    handleExecutedAutomations,
    createAutomation,
    deleteAutomation,
  };
}

export { useAutomationActions };
