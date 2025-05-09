import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  createPipelineAutomationRequest,
  deletePipelineAutomationsRequest,
  updateAutomationActiveStatusRequest,
} from "../../api/api";
import {
  PIPELINE_ADD_USER_TO_TASK,
  PIPELINE_REMOVE_TASK,
} from "../../constants";
import { isUserOrWPUser } from "../../guards/user-guard";
import { ActivePipelineContext } from "../../providers/ActivePipelineContextProvider";
import { AutomationCreationState } from "../../reducers/automation-creation-reducer";
import {
  Automation,
  AutomationAction,
  AutomationFromServer,
  ExecutedAutomation,
} from "../../types/automation";

const actionMessages: { [key in AutomationAction]: string } = {
  [AutomationAction.ARCHIVE_TASK]: __(
    "Task archived by automation",
    "quicktasker",
  ),
  [AutomationAction.ASSIGN_USER]: __(
    "User assigned by automation",
    "quicktasker",
  ),
  [AutomationAction.NEW_ENTITY_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.DELETED_ENTITY_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.TASK_ASSIGNED_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.TASK_UNASSIGNED_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.TASK_PUBLIC_COMMENT_ADDED_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.TASK_PRIVATE_COMMENT_ADDED_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.TASK_FILE_UPLOADED_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.TASK_FILE_DELETED_EMAIL]: __(
    "Email notification sent by automation",
    "quicktasker",
  ),
  [AutomationAction.CREATE_TASK]: __(
    "Task created by automation",
    "quicktasker",
  ),
};

function useAutomationActions() {
  const { dispatch } = useContext(ActivePipelineContext);

  const handleExecutedAutomations = (
    executedAutomations: ExecutedAutomation[],
    triggererId: string,
  ) => {
    if (executedAutomations.length === 0) {
      return;
    }
    handleExecutedAnimationsResults(executedAutomations, triggererId);
    displayAutomationMessages(executedAutomations);
  };

  const displayAutomationMessages = (
    executedAutomations: ExecutedAutomation[],
  ) => {
    if (!executedAutomations) {
      return;
    }
    executedAutomations.forEach((automation) => {
      if (automation.automation_action.includes("email")) {
        // Dont display email sent messages
        return;
      }
      const message =
        actionMessages[automation.automation_action] ||
        `Automation executed: ${automation.automation_action}`;

      toast.info(message);
    });
  };

  const handleExecutedAnimationsResults = (
    executedAutomations: ExecutedAutomation[],
    triggererId: string,
  ) => {
    if (!executedAutomations || !triggererId) {
      return;
    }

    executedAutomations.forEach((automation) => {
      if (automation.automation_action === AutomationAction.ARCHIVE_TASK) {
        dispatch({
          type: PIPELINE_REMOVE_TASK,
          payload: triggererId,
        });
      }
      if (automation.automation_action === AutomationAction.ASSIGN_USER) {
        const executionResult = automation.executionResult;

        if (executionResult && isUserOrWPUser(executionResult)) {
          dispatch({
            type: PIPELINE_ADD_USER_TO_TASK,
            payload: { taskId: triggererId, user: executionResult },
          });
        }
      }
    });
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

  const updateAutomationActiveStatus = async (
    pipelineId: string,
    automationId: string,
    active: boolean,
  ): Promise<{ success: boolean; data: null | AutomationFromServer }> => {
    try {
      const response = await updateAutomationActiveStatusRequest(
        pipelineId,
        automationId,
        active,
      );
      toast.success(
        active
          ? __("Automation activated", "quicktasker")
          : __("Automation deactivated", "quicktasker"),
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      toast.error(
        active
          ? __("Failed to activate automation", "quicktasker")
          : __("Failed to deactivate automation", "quicktasker"),
      );
      return {
        success: false,
        data: null,
      };
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
    updateAutomationActiveStatus,
    deleteAutomation,
  };
}

export { useAutomationActions };
