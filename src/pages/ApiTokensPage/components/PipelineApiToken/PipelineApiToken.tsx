import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { Alert } from "../../../../components/common/Alert/Alert";
import { ApiTokenDropdown } from "../../../../components/Dropdown/ApiTokenDropdown/ApiTokenDropdown";
import { useTimezone } from "../../../../hooks/useTimezone";
import { ApiToken } from "../../../../types/api-token";

type Props = {
  apiToken: ApiToken;
};

type Method = "GET" | "POST" | "PATCH" | "DELETE";

const methodChipClasses: Record<Method, string> = {
  GET: "wpqt-bg-green-100 wpqt-text-green-800",
  POST: "wpqt-bg-blue-100 wpqt-text-blue-800",
  PATCH: "wpqt-bg-amber-100 wpqt-text-amber-800",
  DELETE: "wpqt-bg-red-100 wpqt-text-red-800",
};

function PipelineApiToken({ apiToken }: Props) {
  const { convertToWPTimezone } = useTimezone();

  const boardMethods: Method[] = [];
  if (apiToken.get_pipeline) boardMethods.push("GET");
  if (apiToken.patch_pipeline) boardMethods.push("PATCH");

  const stageMethods: Method[] = [];
  if (apiToken.get_pipeline_stages) stageMethods.push("GET");
  if (apiToken.post_pipeline_stages) stageMethods.push("POST");
  if (apiToken.patch_pipeline_stages) stageMethods.push("PATCH");
  if (apiToken.delete_pipeline_stages) stageMethods.push("DELETE");

  const taskMethods: Method[] = [];
  if (apiToken.get_pipeline_tasks) taskMethods.push("GET");
  if (apiToken.post_pipeline_tasks) taskMethods.push("POST");
  if (apiToken.patch_pipeline_tasks) taskMethods.push("PATCH");
  if (apiToken.delete_pipeline_tasks) taskMethods.push("DELETE");

  const noPermissions =
    boardMethods.length === 0 &&
    stageMethods.length === 0 &&
    taskMethods.length === 0;

  return (
    <WPQTCard
      title={apiToken.name}
      dropdown={<ApiTokenDropdown tokenId={apiToken.id} />}
      dataTestId="pipeline-api-token"
      className="wpqt-w-full wpqt-h-full"
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
            <Alert type="warning" className="!wpqt-flex wpqt-w-full">
              <div className="wpqt-w-full">
                <div className="wpqt-mb-1 wpqt-flex wpqt-items-center wpqt-gap-2">
                  <code className="wpqt-flex-1 wpqt-break-all wpqt-bg-white wpqt-p-2 wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-yellow-300 wpqt-font-mono wpqt-text-black wpqt-text-sm">
                    {apiToken.token}
                  </code>
                  <CopyTokenButton token={apiToken.token} />
                </div>
                {__(
                  "Make sure to copy the token now. You won't be able to see it again.",
                  "quicktasker",
                )}
              </div>
            </Alert>
          }
        />
      )}

      <WPQTCardDataItem
        label={__("Created", "quicktasker")}
        value={convertToWPTimezone(apiToken.created_at)}
      />

      <WPQTCardDataItem
        label={__("Permissions", "quicktasker")}
        labelClassName="wpqt-font-semibold"
        className="!wpqt-flex-col !wpqt-items-start"
        value={
          noPermissions ? (
            <span className="wpqt-text-gray-500">
              {__("No permissions granted", "quicktasker")}
            </span>
          ) : (
            <div className="wpqt-flex wpqt-flex-col wpqt-gap-1">
              <PermissionRow
                label={__("Board", "quicktasker")}
                methods={boardMethods}
              />
              <PermissionRow
                label={__("Stages", "quicktasker")}
                methods={stageMethods}
              />
              <PermissionRow
                label={__("Tasks", "quicktasker")}
                methods={taskMethods}
              />
            </div>
          )
        }
      />
    </WPQTCard>
  );
}

type PermissionRowProps = {
  label: string;
  methods: Method[];
};

function PermissionRow({ label, methods }: PermissionRowProps) {
  if (methods.length === 0) return null;
  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
      <span className="wpqt-w-16 wpqt-shrink-0 wpqt-text-sm wpqt-text-gray-600">
        {label}
      </span>
      <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-1">
        {methods.map((method) => (
          <span
            key={method}
            className={`wpqt-inline-flex wpqt-items-center wpqt-rounded wpqt-px-2 wpqt-py-0.5 wpqt-text-xs wpqt-font-mono wpqt-font-semibold ${methodChipClasses[method]}`}
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}

function CopyTokenButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="wpqt-inline-flex wpqt-shrink-0 wpqt-cursor-pointer wpqt-items-center wpqt-gap-1 wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-yellow-400 wpqt-bg-white wpqt-px-2 wpqt-py-1 wpqt-text-xs wpqt-font-semibold wpqt-text-yellow-800 hover:wpqt-bg-yellow-50"
      aria-label={__("Copy token", "quicktasker")}
    >
      {copied ? (
        <>
          <CheckIcon className="wpqt-size-4" />
          {__("Copied", "quicktasker")}
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="wpqt-size-4" />
          {__("Copy", "quicktasker")}
        </>
      )}
    </button>
  );
}

export { PipelineApiToken };
