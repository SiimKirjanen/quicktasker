import { useContext, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import { Loading } from "../../../../components/Loading/Loading";
import { useCapabilityActions } from "../../../../hooks/actions/useCapabilityActions";
import { usePipelines } from "../../../../hooks/usePipelines";
import { AppContext } from "../../../../providers/AppContextProvider";
import { WPUserCapabilities } from "../../../../types/capabilities";
import { WPUser, WPUserCapabilitiesUpdate } from "../../../../types/user";
import {
  formatIntegrationCount,
  showStoppedIntegrationsWarning,
} from "./StoppedIntegrationsWarning/StoppedIntegrationsWarning";
import { WPUserPipelineAccess } from "./WPUserPipelineAccess/WPUserPipelineAccess";

type Props = {
  user: WPUser;
};
function WPUserItem({ user }: Props) {
  const {
    state: { currentUserId },
  } = useContext(AppContext);
  const isOwnUser = user.id === currentUserId;
  const [capabilitySettings, setCapabilitySettings] =
    useState<WPUserCapabilities>({
      quicktasker_admin_role: "quicktasker_admin_role" in user.allcaps,
      quicktasker_admin_role_allow_delete:
        "quicktasker_admin_role_allow_delete" in user.allcaps,
      quicktasker_admin_role_manage_users:
        "quicktasker_admin_role_manage_users" in user.allcaps,
      quicktasker_admin_role_manage_settings:
        "quicktasker_admin_role_manage_settings" in user.allcaps,
      quicktasker_admin_role_manage_archive:
        "quicktasker_admin_role_manage_archive" in user.allcaps,
      quicktasker_access_user_page_app:
        "quicktasker_access_user_page_app" in user.allcaps,
      quicktasker_view_my_tasks: "quicktasker_view_my_tasks" in user.allcaps,
    });
  const [updating, setUpdating] = useState(false);
  const { updateWPUserCapabilities } = useCapabilityActions();
  const { pipelines } = usePipelines();
  const adminSubTogglesDisabled =
    isOwnUser || !capabilitySettings.quicktasker_admin_role;

  const warnAboutStoppedIntegrations = (update: WPUserCapabilitiesUpdate) => {
    update.stopped_integrations.forEach((integration) => {
      const pipeline = pipelines.find(
        (p) => p.id === String(integration.pipeline_id),
      );

      showStoppedIntegrationsWarning(
        integration,
        sprintf(
          // translators: 1: user name, 2: number of API tokens and webhooks, 3: board name
          __(
            "%1$s created %2$s on %3$s, which stopped working. They work again if %1$s can manage settings again.",
            "quicktasker",
          ),
          user.name,
          formatIntegrationCount(integration),
          pipeline ? pipeline.name : "",
        ),
      );
    });
  };

  const onToggleChange = async (checked: boolean, capability: string) => {
    if (updating || isOwnUser) {
      return;
    }

    setUpdating(true);
    const oldCapabilities = { ...capabilitySettings };
    const updatedCapabilitySettings = {
      ...capabilitySettings,
      [capability]: checked,
    };

    setCapabilitySettings(updatedCapabilitySettings);
    await updateWPUserCapabilities(
      user.id,
      updatedCapabilitySettings,
      warnAboutStoppedIntegrations,
      () => {
        setCapabilitySettings(oldCapabilities);
      },
    );
    setUpdating(false);
  };

  return (
    <WPQTCard title={user.name} description={user.description}>
      <WPQTCardDataItem
        label={__("Role", "quicktasker")}
        value={Array.isArray(user.roles) ? user.roles.join(", ") : ""}
      />
      {isOwnUser && (
        <div
          className="wpqt-mb-2 wpqt-text-sm wpqt-text-gray-500"
          data-testid="wp-user-own-permissions-notice"
        >
          {__("You cannot change your own permissions.", "quicktasker")}
        </div>
      )}
      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Access to plugin admin area", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_admin_role}
          disabled={isOwnUser}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_admin_role");
          }}
        />

        <div className="wpqt-mt-3 wpqt-pl-4 wpqt-border-l-2 wpqt-border-gray-200">
          <div className="wpqt-mb-2">
            <div className="wpqt-mb-2">
              {__("Access to QuickTasker user management", "quicktasker")}
            </div>
            <Toggle
              checked={capabilitySettings.quicktasker_admin_role_manage_users}
              disabled={adminSubTogglesDisabled}
              handleChange={(checked: boolean) => {
                onToggleChange(checked, "quicktasker_admin_role_manage_users");
              }}
            />
          </div>

          <div className="wpqt-mb-2">
            <div className="wpqt-mb-2">
              {__(
                "Access to manage settings (boards, stages, automations, webhooks, api tokens)",
                "quicktasker",
              )}
            </div>
            <Toggle
              checked={
                capabilitySettings.quicktasker_admin_role_manage_settings
              }
              disabled={adminSubTogglesDisabled}
              dataTestId="wp-user-manage-settings-toggle"
              handleChange={(checked: boolean) => {
                onToggleChange(
                  checked,
                  "quicktasker_admin_role_manage_settings",
                );
              }}
            />
          </div>

          <div className="wpqt-mb-2">
            <div className="wpqt-mb-2">
              {__("Access to archive page", "quicktasker")}
            </div>
            <Toggle
              checked={capabilitySettings.quicktasker_admin_role_manage_archive}
              disabled={adminSubTogglesDisabled}
              handleChange={(checked: boolean) => {
                onToggleChange(
                  checked,
                  "quicktasker_admin_role_manage_archive",
                );
              }}
            />
          </div>

          <div className="wpqt-mb-2">
            <div className="wpqt-mb-2">
              {__("Allow access to Tasks App", "quicktasker")}
            </div>
            <Toggle
              checked={capabilitySettings.quicktasker_access_user_page_app}
              disabled={adminSubTogglesDisabled}
              handleChange={(checked: boolean) => {
                onToggleChange(checked, "quicktasker_access_user_page_app");
              }}
            />
          </div>

          <div className="wpqt-mb-2">
            <div className="wpqt-mb-2">
              {__("Allow to delete resources", "quicktasker")}
            </div>
            <Toggle
              checked={capabilitySettings.quicktasker_admin_role_allow_delete}
              disabled={adminSubTogglesDisabled}
              handleChange={(checked: boolean) => {
                onToggleChange(checked, "quicktasker_admin_role_allow_delete");
              }}
            />
          </div>
        </div>
      </div>

      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Access to My Tasks page", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_view_my_tasks}
          disabled={isOwnUser}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_view_my_tasks");
          }}
        />
      </div>

      <WPUserPipelineAccess user={user} />

      {updating && <Loading ovalSize="24" />}
    </WPQTCard>
  );
}

export { WPUserItem };
