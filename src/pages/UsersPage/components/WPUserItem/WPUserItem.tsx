import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import { Loading } from "../../../../components/Loading/Loading";
import { useCapabilityActions } from "../../../../hooks/actions/useCapabilityActions";
import { WPUserCapabilities } from "../../../../types/capabilities";
import { WPUser } from "../../../../types/user";

type Props = {
  user: WPUser;
};
function WPUserItem({ user }: Props) {
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
    });
  const [updating, setUpdating] = useState(false);
  const { updateWPUserCapabilities } = useCapabilityActions();

  const onToggleChange = async (checked: boolean, capability: string) => {
    if (updating) {
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
      () => {},
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
      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Access to admin areas", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_admin_role}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_admin_role");
          }}
        />
      </div>

      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Access to users page", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_admin_role_manage_users}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_admin_role_manage_users");
          }}
        />
      </div>

      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Access to settings page", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_admin_role_manage_settings}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_admin_role_manage_settings");
          }}
        />
      </div>

      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Access to archive page", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_admin_role_manage_archive}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_admin_role_manage_archive");
          }}
        />
      </div>

      <div className="wpqt-mb-2">
        <div className="wpqt-mb-2">
          {__("Allow to delete resources", "quicktasker")}
        </div>
        <Toggle
          checked={capabilitySettings.quicktasker_admin_role_allow_delete}
          handleChange={(checked: boolean) => {
            onToggleChange(checked, "quicktasker_admin_role_allow_delete");
          }}
        />
      </div>

      {updating && <Loading ovalSize="24" />}
    </WPQTCard>
  );
}

export { WPUserItem };
