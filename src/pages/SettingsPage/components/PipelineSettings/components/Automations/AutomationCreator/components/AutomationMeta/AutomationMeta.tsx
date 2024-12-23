import { SET_AUTOMATION_META } from "../../../../../../../../../constants";
import { Action } from "../../../../../../../../../reducers/automation-creation-reducer";
import { AutomationAction } from "../../../../../../../../../types/automation";
import { EmailMetaInput } from "./components/EmailMetaInput/EmailMetaInput";

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
    action === AutomationAction.TASK_PUBLIC_COMMENT_ADDED_EMAIL;

  const setAutomationMeta = (meta: string) => {
    automationDispatch({
      type: SET_AUTOMATION_META,
      payload: meta,
    });
  };

  if (requiresEmailInput) {
    return <EmailMetaInput setAutomationMeta={setAutomationMeta} />;
  }

  return null;
}

export { AutomationMeta };
