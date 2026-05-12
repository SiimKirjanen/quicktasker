import { __ } from "@wordpress/i18n";
import { QuickTaskerIcon } from "../../../../components/Icon/QuickTaskerIcon/QuickTaskerIcon";
import { WordPressIcon } from "../../../../components/Icon/WordPressIcon/WordPressIcon";
import { useUser } from "../../../../hooks/useUser";
import { ActionTargetType } from "../../../../types/automation";
import { mapActionTargetTypeToUserType } from "../../../../utils/user";

type Props = {
  actionTargetId: string | null;
  actionTargetType: ActionTargetType | null;
};
function AutomationActionTarget({ actionTargetId, actionTargetType }: Props) {
  if (actionTargetId === null || actionTargetType === null) {
    return null;
  }
  const { getUser } = useUser();
  const isUserTarget =
    actionTargetType === ActionTargetType.QUICKTASKER ||
    actionTargetType === ActionTargetType.WP_USER ||
    actionTargetId !== null;

  if (isUserTarget) {
    const userType = mapActionTargetTypeToUserType(actionTargetType);

    if (userType) {
      const user = getUser(actionTargetId, userType);

      return (
        <div className="wpqt-flex wpqt-items-center wpqt-justify-center wpqt-gap-1">
          {actionTargetType === ActionTargetType.WP_USER ? (
            <WordPressIcon size={16} />
          ) : (
            <QuickTaskerIcon />
          )}
          <span>{user?.name || __("User not found", "quicktasker")}</span>
        </div>
      );
    }
  }

  return null;
}

export { AutomationActionTarget };
