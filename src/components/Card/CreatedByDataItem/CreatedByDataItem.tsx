import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { getCreatorName } from "../../../utils/user";
import { WPQTCardDataItem } from "../WPQTCardDataItem/WPQTCardDataItem";

type Props = {
  createdBy: string | null;
  createdByName: string | null;
  // Whether the creator can still use the board and manage settings. Null or missing when unknown.
  hasBoardAccess?: boolean | null;
  // Prefix of the test IDs, like "api-token".
  testId: string;
};

/**
 * Shows who created an API token, webhook or automation, and warns when they lost access to its board or the permission to manage settings.
 */
function CreatedByDataItem({
  createdBy,
  createdByName,
  hasBoardAccess,
  testId,
}: Props) {
  const creatorName = getCreatorName(createdBy, createdByName);

  if (!creatorName) {
    return null;
  }

  return (
    <WPQTCardDataItem
      label={__("Created by", "quicktasker")}
      value={
        <span className="wpqt-inline-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-1">
          <span data-testid={`${testId}-created-by`}>{creatorName}</span>
          {hasBoardAccess === false && (
            <span
              className="wpqt-inline-flex wpqt-items-center wpqt-gap-0.5 wpqt-text-yellow-700"
              data-testid={`${testId}-creator-lost-access`}
            >
              <ExclamationTriangleIcon
                className="wpqt-size-4"
                aria-hidden="true"
              />
              {__("Lost access", "quicktasker")}
            </span>
          )}
        </span>
      }
    />
  );
}

export { CreatedByDataItem };
