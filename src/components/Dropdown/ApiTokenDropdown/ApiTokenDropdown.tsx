import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { REMOVE_PIPELINE_API_TOKEN } from "../../../constants";
import { useApiTokenActions } from "../../../hooks/actions/useApiTokenActions";
import { useApiTokens } from "../../../hooks/useApiTokens";
import { WPQTConfirmTooltip } from "../../Dialog/ConfirmTooltip/ConfirmTooltip";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

type Props = {
  tokenId: string;
};
function ApiTokenDropdown({ tokenId }: Props) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { deleteApiToken } = useApiTokenActions();
  const { activePipelineId, pipelineApiTokensDispatch } = useApiTokens();

  return (
    <WPQTDropdown
      menuBtn={({ active }) => (
        <WPQTDropdownIcon
          isActive={active}
          IconComponent={EllipsisHorizontalIcon}
        />
      )}
    >
      <WPQTConfirmTooltip
        onConfirm={async () => {
          if (!activePipelineId) return;

          setDeleteLoading(true);
          const result = await deleteApiToken(tokenId, activePipelineId);
          if (result.success) {
            pipelineApiTokensDispatch({
              type: REMOVE_PIPELINE_API_TOKEN,
              payload: tokenId,
            });
          }
          setDeleteLoading(false);
        }}
        confirmMessage={__(
          "Are you sure you want to delete this API token?",
          "quicktasker",
        )}
        confirmButtonText={__("Delete", "quicktasker")}
      >
        {({ onClick }) => (
          <WPQTDropdownItem
            text={__("Delete token", "quicktasker")}
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
            loading={deleteLoading}
            onClick={onClick}
            className="!wpqt-mb-0"
          />
        )}
      </WPQTConfirmTooltip>
    </WPQTDropdown>
  );
}

export { ApiTokenDropdown };
