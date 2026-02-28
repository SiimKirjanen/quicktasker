import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTButton } from "../../../../components/common/Button/Button";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { WPQTLabel } from "../../../../components/common/Label/WPQTLabel";
import { WPQTTextarea } from "../../../../components/common/TextArea/TextArea";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import { ADD_PIPELINE_API_TOKEN } from "../../../../constants";
import { useApiTokenActions } from "../../../../hooks/actions/useApiTokenActions";
import { useApiTokens } from "../../../../hooks/useApiTokens";
import { NewApiToken } from "../../../../types/api-token";
import { converApiTokenFromServer } from "../../../../utils/api-token";

type Props = {
  pipelineId: string;
};

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

function PipelineApiTokenCreator({ pipelineId }: Props) {
  const [newApiToken, setNewApiToken] = useState<NewApiToken>({
    ...defaultNewApiToken,
    pipeline_id: pipelineId,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const { createApiToken } = useApiTokenActions();
  const { pipelineApiTokensDispatch } = useApiTokens();

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

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-start">
      <WPQTLabel labelFor="api-token-name">
        {__("Name", "quicktasker")}
      </WPQTLabel>
      <WPQTInput
        inputId="api-token-name"
        value={newApiToken.name}
        onChange={(name) => setNewApiToken({ ...newApiToken, name })}
      />
      <WPQTLabel labelFor="api-token-description">
        {__("Description", "quicktasker")}
      </WPQTLabel>
      <WPQTTextarea
        id="api-token-description"
        value={newApiToken.description}
        onChange={(description) =>
          setNewApiToken({ ...newApiToken, description })
        }
      />
      <div className="wpqt-flex wpqt-gap-4">
        <div>
          <WPQTLabel className="wpqt-block wpqt-font-semibold wpqt-mb-2">
            {__("Board permissions", "quicktasker")}
          </WPQTLabel>
          <div className="wpqt-flex wpqt-gap-2">
            <PermissionsCheckbox
              label={__("GET board", "quicktasker")}
              permissionKey="get_pipeline"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("PATCH board", "quicktasker")}
              permissionKey="patch_pipeline"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
          </div>
        </div>
        <div>
          <WPQTLabel className="wpqt-block wpqt-font-semibold wpqt-mb-2">
            {__("Board stage permissions", "quicktasker")}
          </WPQTLabel>
          <div className="wpqt-flex wpqt-gap-2">
            <PermissionsCheckbox
              label={__("GET stages", "quicktasker")}
              permissionKey="get_pipeline_stages"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("POST stages", "quicktasker")}
              permissionKey="post_pipeline_stages"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("PATCH stages", "quicktasker")}
              permissionKey="patch_pipeline_stages"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("DELETE stages", "quicktasker")}
              permissionKey="delete_pipeline_stages"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
          </div>
        </div>
        <div>
          <WPQTLabel className="wpqt-block wpqt-font-semibold wpqt-mb-2">
            {__("Board task permissions", "quicktasker")}
          </WPQTLabel>
          <div className="wpqt-flex wpqt-gap-2">
            <PermissionsCheckbox
              label={__("GET tasks", "quicktasker")}
              permissionKey="get_pipeline_tasks"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("POST tasks", "quicktasker")}
              permissionKey="post_pipeline_tasks"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("PATCH tasks", "quicktasker")}
              permissionKey="patch_pipeline_tasks"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
            <PermissionsCheckbox
              label={__("DELETE tasks", "quicktasker")}
              permissionKey="delete_pipeline_tasks"
              newApiToken={newApiToken}
              setNewApiToken={setNewApiToken}
            />
          </div>
        </div>
      </div>

      <WPQTButton
        btnText={__("Create API Token", "quicktasker")}
        className="wpqt-my-4"
        onClick={handleCreateApiToken}
        loading={saving}
      />
    </div>
  );
}

type PermissionsCheckboxProps = {
  label: string;
  permissionKey: keyof Omit<
    NewApiToken,
    "name" | "description" | "pipeline_id"
  >;
  newApiToken: NewApiToken;
  setNewApiToken: React.Dispatch<React.SetStateAction<NewApiToken>>;
};
function PermissionsCheckbox({
  label,
  permissionKey,
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
        handleChange={(checked) =>
          setNewApiToken({ ...newApiToken, [permissionKey]: checked })
        }
      />
    </div>
  );
}

export { PipelineApiTokenCreator };
