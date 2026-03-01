import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TbLogs } from "react-icons/tb";
import {
  OPEN_API_TOKEN_LOGS_MODAL,
  REMOVE_PIPELINE_API_TOKEN,
} from "../../../constants";
import { useApiTokenActions } from "../../../hooks/actions/useApiTokenActions";
import { useApiTokens } from "../../../hooks/useApiTokens";
import { ModalContext } from "../../../providers/ModalContextProvider";
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
  const { modalDispatch } = useContext(ModalContext);

  return (
    <WPQTDropdown
      menuBtn={({ active }) => (
        <WPQTDropdownIcon
          isActive={active}
          IconComponent={EllipsisHorizontalIcon}
        />
      )}
    >
      <WPQTDropdownItem
        text={__("View logs", "quicktasker")}
        icon={<TbLogs className="wpqt-icon-blue wpqt-size-5" />}
        onClick={() =>
          modalDispatch({
            type: OPEN_API_TOKEN_LOGS_MODAL,
            payload: { apiTokenId: tokenId },
          })
        }
      />
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
          />
        )}
      </WPQTConfirmTooltip>
    </WPQTDropdown>
  );
}

export { ApiTokenDropdown };
