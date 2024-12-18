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
  const isEmailInput = action === AutomationAction.NEW_ENTITY_EMAIL;

  const setAutomationMeta = (meta: string) => {
    automationDispatch({
      type: "SET_META",
      payload: meta,
    });
  };

  if (isEmailInput) {
    return <EmailMetaInput setAutomationMeta={setAutomationMeta} />;
  }

  return null;
}

export { AutomationMeta };
