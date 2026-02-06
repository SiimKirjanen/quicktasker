import { SET_AUTOMATION_META } from "../../../../../../constants";
import { Action } from "../../../../../../reducers/automation-creation-reducer";
import { AutomationAction } from "../../../../../../types/automation";
import { EmailMetaInput } from "./components/EmailMetaInput/EmailMetaInput";
import SlackWebhookMetaInput from "./components/SlackWebhookMetaInput/SlackWebhookMetaInput";

type Props = {
  automationCreationState: {
    automationAction: {
      id: string | null;
    } | null;
  };
  automationDispatch: React.Dispatch<Action>;
};

function AutomationMeta({
  automationCreationState,
  automationDispatch,
}: Props) {
  const action = automationCreationState?.automationAction?.id;
  const requiresEmailInput =
    action === AutomationAction.NEW_ENTITY_EMAIL ||
    action === AutomationAction.DELETED_ENTITY_EMAIL ||
    action === AutomationAction.TASK_ASSIGNED_EMAIL ||
    action === AutomationAction.TASK_UNASSIGNED_EMAIL ||
    action === AutomationAction.TASK_PUBLIC_COMMENT_ADDED_EMAIL ||
    action === AutomationAction.TASK_PRIVATE_COMMENT_ADDED_EMAIL ||
    action === AutomationAction.TASK_FILE_UPLOADED_EMAIL ||
    action === AutomationAction.TASK_FILE_DELETED_EMAIL;
  const requireSlackMessageWebhook =
    action === AutomationAction.SEND_SLACK_MESSAGE;

  const setAutomationMeta = (meta: string) => {
    automationDispatch({
      type: SET_AUTOMATION_META,
      payload: meta,
    });
  };

  if (requiresEmailInput) {
    return <EmailMetaInput setAutomationMeta={setAutomationMeta} />;
  }

  if (requireSlackMessageWebhook) {
    return <SlackWebhookMetaInput setAutomationMeta={setAutomationMeta} />;
  }

  return null;
}

export { AutomationMeta };
