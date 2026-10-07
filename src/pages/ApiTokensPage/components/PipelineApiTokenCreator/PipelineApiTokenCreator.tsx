import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { LuKeySquare } from "react-icons/lu";
import {
  ButtonStyleType,
  WPQTButton,
} from "../../../../components/common/Button/Button";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { WPQTLabel } from "../../../../components/common/Label/WPQTLabel";
import { WPQTTextarea } from "../../../../components/common/TextArea/TextArea";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import { ADD_PIPELINE_API_TOKEN } from "../../../../constants";
import { useApiTokenActions } from "../../../../hooks/actions/useApiTokenActions";
import { useApiTokens } from "../../../../hooks/useApiTokens";
import { AppContext } from "../../../../providers/AppContextProvider";
import { NewApiToken } from "../../../../types/api-token";
import { converApiTokenFromServer } from "../../../../utils/api-token";

type Props = {
  pipelineId: string;
};

type PermissionKey = keyof Omit<
  NewApiToken,
  "name" | "description" | "pipeline_id"
>;

const defaultNewApiToken: Omit<NewApiToken, "pipeline_id"> = {
  name: "",
  description: "",
  get_pipeline: true,
  patch_pipeline: false,
  get_pipeline_stages: false,
  post_pipeline_stages: false,
  patch_pipeline_stages: false,
  delete_pipeline_stages: false,
  get_pipeline_tasks: false,
  post_pipeline_tasks: false,
  patch_pipeline_tasks: false,
  delete_pipeline_tasks: false,
};

const allPermissionKeys: PermissionKey[] = [
  "get_pipeline",
  "patch_pipeline",
  "get_pipeline_stages",
  "post_pipeline_stages",
  "patch_pipeline_stages",
  "delete_pipeline_stages",
  "get_pipeline_tasks",
  "post_pipeline_tasks",
  "patch_pipeline_tasks",
  "delete_pipeline_tasks",
];

// Only users who can delete can give a token these.
const deleteKeys: PermissionKey[] = [
  "delete_pipeline_stages",
  "delete_pipeline_tasks",
];

const readOnlyKeys: PermissionKey[] = [
  "get_pipeline",
  "get_pipeline_stages",
  "get_pipeline_tasks",
];

function PipelineApiTokenCreator({ pipelineId }: Props) {
  const [newApiToken, setNewApiToken] = useState<NewApiToken>({
    ...defaultNewApiToken,
    pipeline_id: pipelineId,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const { createApiToken } = useApiTokenActions();
  const { pipelineApiTokensDispatch } = useApiTokens();
  const {
    state: { isUserAllowedToDelete },
  } = useContext(AppContext);
  const disabledKeys = isUserAllowedToDelete ? [] : deleteKeys;
  const grantableKeys = allPermissionKeys.filter(
    (key) => !disabledKeys.includes(key),
  );

  const handleCreateApiToken = async () => {
    setSaving(true);
    const result = await createApiToken(newApiToken);
    setSaving(false);

    if (result.success && result.data) {
      pipelineApiTokensDispatch({
        type: ADD_PIPELINE_API_TOKEN,
        payload: { apiToken: converApiTokenFromServer(result.data) },
      });
      resetCreator();
    }
  };

  const resetCreator = () => {
    setNewApiToken({ ...defaultNewApiToken, pipeline_id: pipelineId });
  };

  const applyPreset = (granted: PermissionKey[]) => {
    const updates: Record<string, boolean> = {};
    for (const key of allPermissionKeys) {
      updates[key] = granted.includes(key);
    }
    setNewApiToken({ ...newApiToken, ...updates });
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-mt-6">
      <WPQTLabel labelFor="api-token-name">
        {__("Name", "quicktasker")}
      </WPQTLabel>
      <WPQTInput
        inputId="api-token-name"
        value={newApiToken.name}
        wrapperClassName="wpqt-w-full"
        className="wpqt-w-full"
        onChange={(name) => setNewApiToken({ ...newApiToken, name })}
      />
      <WPQTLabel labelFor="api-token-description">
        {__("Description", "quicktasker")}
      </WPQTLabel>
      <WPQTTextarea
        id="api-token-description"
        value={newApiToken.description}
        wrapperClassName="wpqt-w-full"
        className="!wpqt-w-full"
        onChange={(description) =>
          setNewApiToken({ ...newApiToken, description })
        }
      />

      <div className="wpqt-flex wpqt-gap-2 wpqt-mb-3">
        <WPQTButton
          btnText={__("Read-only", "quicktasker")}
          buttonStyleType={ButtonStyleType.SECONDARY}
          onClick={() => applyPreset(readOnlyKeys)}
        />
        <WPQTButton
          btnText={__("Full access", "quicktasker")}
          buttonStyleType={ButtonStyleType.SECONDARY}
          onClick={() => applyPreset(grantableKeys)}
        />
        <WPQTButton
          btnText={__("Clear", "quicktasker")}
          buttonStyleType={ButtonStyleType.SECONDARY}
          onClick={() => applyPreset([])}
        />
      </div>

      <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
        <PermissionGroup
          title={__("Board permissions", "quicktasker")}
          items={[
            { label: __("GET board", "quicktasker"), key: "get_pipeline" },
            { label: __("PATCH board", "quicktasker"), key: "patch_pipeline" },
          ]}
          disabledKeys={disabledKeys}
          newApiToken={newApiToken}
          setNewApiToken={setNewApiToken}
        />
        <PermissionGroup
          title={__("Board stage permissions", "quicktasker")}
          items={[
            {
              label: __("GET stages", "quicktasker"),
              key: "get_pipeline_stages",
            },
            {
              label: __("POST stages", "quicktasker"),
              key: "post_pipeline_stages",
            },
            {
              label: __("PATCH stages", "quicktasker"),
              key: "patch_pipeline_stages",
            },
            {
              label: __("DELETE stages", "quicktasker"),
              key: "delete_pipeline_stages",
            },
          ]}
          disabledKeys={disabledKeys}
          newApiToken={newApiToken}
          setNewApiToken={setNewApiToken}
        />
        <PermissionGroup
          title={__("Board task permissions", "quicktasker")}
          items={[
            {
              label: __("GET tasks", "quicktasker"),
              key: "get_pipeline_tasks",
            },
            {
              label: __("POST tasks", "quicktasker"),
              key: "post_pipeline_tasks",
            },
            {
              label: __("PATCH tasks", "quicktasker"),
              key: "patch_pipeline_tasks",
            },
            {
              label: __("DELETE tasks", "quicktasker"),
              key: "delete_pipeline_tasks",
            },
          ]}
          disabledKeys={disabledKeys}
          newApiToken={newApiToken}
          setNewApiToken={setNewApiToken}
        />
        {!isUserAllowedToDelete && (
          <p
            className="wpqt-m-0 wpqt-text-sm wpqt-text-gray-600"
            data-testid="api-token-delete-permission-note"
          >
            {__(
              "DELETE needs the permission to delete resources.",
              "quicktasker",
            )}
          </p>
        )}
      </div>

      <WPQTButton
        btnText={__("Create API Token", "quicktasker")}
        icon={<LuKeySquare className="wpqt-size-4" />}
        className="wpqt-my-4 wpqt-self-end"
        onClick={handleCreateApiToken}
        loading={saving}
        disabled={
          newApiToken.name.trim() === "" ||
          !allPermissionKeys.some((key) => newApiToken[key])
        }
      />
    </div>
  );
}

type PermissionItem = {
  label: string;
  key: PermissionKey;
};

type PermissionGroupProps = {
  title: string;
  items: PermissionItem[];
  // Permissions the current user can't give a token.
  disabledKeys: PermissionKey[];
  newApiToken: NewApiToken;
  setNewApiToken: React.Dispatch<React.SetStateAction<NewApiToken>>;
};

function PermissionGroup({
  title,
  items,
  disabledKeys,
  newApiToken,
  setNewApiToken,
}: PermissionGroupProps) {
  return (
    <div>
      <WPQTLabel className="wpqt-block wpqt-font-semibold wpqt-mb-2">
        {title}
      </WPQTLabel>
      <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-4">
        {items.map((item) => (
          <PermissionsCheckbox
            key={item.key}
            label={item.label}
            permissionKey={item.key}
            disabled={disabledKeys.includes(item.key)}
            newApiToken={newApiToken}
            setNewApiToken={setNewApiToken}
          />
        ))}
      </div>
    </div>
  );
}

type PermissionsCheckboxProps = {
  label: string;
  permissionKey: PermissionKey;
  disabled: boolean;
  newApiToken: NewApiToken;
  setNewApiToken: React.Dispatch<React.SetStateAction<NewApiToken>>;
};
function PermissionsCheckbox({
  label,
  permissionKey,
  disabled,
  newApiToken,
  setNewApiToken,
}: PermissionsCheckboxProps) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-1">
      <WPQTLabel labelFor={`api-token-permission-${permissionKey}`}>
        {label}
      </WPQTLabel>
      <Toggle
        id={`api-token-permission-${permissionKey}`}
        checked={!!newApiToken[permissionKey]}
        disabled={disabled}
        handleChange={(checked) =>
          setNewApiToken({ ...newApiToken, [permissionKey]: checked })
        }
      />
    </div>
  );
}

export { PipelineApiTokenCreator };
