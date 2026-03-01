import { __ } from "@wordpress/i18n";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { Alert } from "../../../../components/common/Alert/Alert";
import { ApiTokenDropdown } from "../../../../components/Dropdown/ApiTokenDropdown/ApiTokenDropdown";
import { useTimezone } from "../../../../hooks/useTimezone";
import { ApiToken } from "../../../../types/api-token";

type Props = {
  apiToken: ApiToken;
};

function PipelineApiToken({ apiToken }: Props) {
  const { convertToWPTimezone } = useTimezone();

  return (
    <WPQTCard
      title={apiToken.name}
      dropdown={<ApiTokenDropdown tokenId={apiToken.id} />}
    >
      {apiToken.description && (
        <WPQTCardDataItem
          label={__("Description", "quicktasker")}
          value={apiToken.description || ""}
        />
      )}

      {apiToken.token && (
        <WPQTCardDataItem
          label={__("Token", "quicktasker")}
          value={
            <Alert type="info">
              {
                <div>
                  <div className="wpqt-mb-1 wpqt-font-semibold wpqt-text-black wpqt-text-lg">
                    {apiToken.token}
                  </div>
                  {__(
                    "Make sure to copy the token now. You won't be able to see it again.",
                    "quicktasker",
                  )}
                </div>
              }
            </Alert>
          }
        />
      )}

      <WPQTCardDataItem
        label={__("Created At", "quicktasker")}
        value={convertToWPTimezone(apiToken.created_at)}
      />

      <WPQTCardDataItem
        label={__("Board permissions", "quicktasker")}
        labelClassName="wpqt-font-semibold"
        className="!wpqt-flex-col !wpqt-items-start"
        value={
          <div>
            <PermissionItem
              label={__("GET board", "quicktasker")}
              hasPermission={apiToken.get_pipeline === true}
            />
            <PermissionItem
              label={__("PATCH board", "quicktasker")}
              hasPermission={apiToken.patch_pipeline === true}
            />
          </div>
        }
      />
      <WPQTCardDataItem
        label={__("Board stage permissions", "quicktasker")}
        labelClassName="wpqt-font-semibold"
        className="!wpqt-flex-col !wpqt-items-start"
        value={
          <div>
            <PermissionItem
              label={__("GET stages", "quicktasker")}
              hasPermission={apiToken.get_pipeline_stages === true}
            />
            <PermissionItem
              label={__("POST stages", "quicktasker")}
              hasPermission={apiToken.post_pipeline_stages === true}
            />
            <PermissionItem
              label={__("PATCH stages", "quicktasker")}
              hasPermission={apiToken.patch_pipeline_stages === true}
            />
            <PermissionItem
              label={__("DELETE stages", "quicktasker")}
              hasPermission={apiToken.delete_pipeline_stages === true}
            />
          </div>
        }
      />
      <WPQTCardDataItem
        label={__("Board task permissions", "quicktasker")}
        labelClassName="wpqt-font-semibold"
        className="!wpqt-flex-col !wpqt-items-start"
        value={
          <div>
            <PermissionItem
              label={__("GET tasks", "quicktasker")}
              hasPermission={apiToken.get_pipeline_tasks === true}
            />
            <PermissionItem
              label={__("POST tasks", "quicktasker")}
              hasPermission={apiToken.post_pipeline_tasks === true}
            />
            <PermissionItem
              label={__("PATCH tasks", "quicktasker")}
              hasPermission={apiToken.patch_pipeline_tasks === true}
            />
            <PermissionItem
              label={__("DELETE tasks", "quicktasker")}
              hasPermission={apiToken.delete_pipeline_tasks === true}
            />
          </div>
        }
      />
    </WPQTCard>
  );
}

type PermissionItemProps = {
  label: string;
  hasPermission: boolean;
};

function PermissionItem({ label, hasPermission }: PermissionItemProps) {
  return (
    <div className="wpqt-flex wpqt-gap-2 wpqt-items-center">
      {label}{" "}
      {hasPermission ? (
        <IoCheckmark className="wpqt-icon-green wpqt-size-5" />
      ) : (
        <IoClose className="wpqt-icon-red wpqt-size-5" />
      )}
    </div>
  );
}

export { PipelineApiToken };
