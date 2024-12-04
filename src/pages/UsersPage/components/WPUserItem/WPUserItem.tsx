import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard, WPQTCardDataItem } from "../../../../components/Card/Card";
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
      <WPQTCardDataItem label={__("Email", "quicktasker")} value={user.email} />
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
