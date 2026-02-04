import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTIconButton } from "../../../../common/Button/WPQTIconButton/WPQTIconButton";

type Props = {
  title: string;
  description: string;
  onSave: () => Promise<void>;
  saveBtnText?: string;
  icon?: React.ReactNode;
};
function ArchiveSetting({
  title,
  description,
  onSave,
  icon,
  saveBtnText = __("Clean", "quicktask"),
}: Props) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) {
      return;
    }
    setSaving(true);
    await onSave();
    setSaving(false);
  };

  return (
    <div>
      <div className="wpqt-font-semibold wpqt-text-lg">{title}</div>
      <p className="wpqt-mt-0">{description}</p>
      <WPQTIconButton
        onClick={handleSave}
        icon={icon}
        loading={saving}
        text={saveBtnText}
      />
    </div>
  );
}

export { ArchiveSetting };
