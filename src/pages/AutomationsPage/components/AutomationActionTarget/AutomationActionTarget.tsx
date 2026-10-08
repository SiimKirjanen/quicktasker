import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { QuickTaskerIcon } from "../../../../components/Icon/QuickTaskerIcon/QuickTaskerIcon";
import { WordPressIcon } from "../../../../components/Icon/WordPressIcon/WordPressIcon";
import { useUser } from "../../../../hooks/useUser";
import { ActionTargetType } from "../../../../types/automation";
import {
  canUserAccessPipeline,
  mapActionTargetTypeToUserType,
} from "../../../../utils/user";

type Props = {
  actionTargetId: string | null;
  actionTargetType: ActionTargetType | null;
  // The automation's board. Users must have been added to it to be assigned.
  pipelineId: string;
};
function AutomationActionTarget({
  actionTargetId,
  actionTargetType,
  pipelineId,
}: Props) {
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
      const lacksBoardAccess =
        !!user && !canUserAccessPipeline(user, pipelineId);

      return (
        <div className="wpqt-flex wpqt-items-center wpqt-justify-center wpqt-gap-1">
          {actionTargetType === ActionTargetType.WP_USER ? (
            <WordPressIcon size={16} />
          ) : (
            <QuickTaskerIcon />
          )}
          <span>{user?.name || __("User not found", "quicktasker")}</span>
          {lacksBoardAccess && (
            <span
              className="wpqt-inline-flex wpqt-items-center wpqt-gap-1 wpqt-text-yellow-700"
              data-testid="automation-target-no-board-access"
            >
              <ExclamationTriangleIcon className="wpqt-size-4" />
              {__(
                "Not added to this board, so the automation cannot assign them",
                "quicktasker",
              )}
            </span>
          )}
        </div>
      );
    }
  }

  return null;
}

export { AutomationActionTarget };
