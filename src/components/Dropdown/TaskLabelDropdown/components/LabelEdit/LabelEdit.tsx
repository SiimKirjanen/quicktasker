import { Colorful, ColorResult } from "@uiw/react-color";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Label } from "../../../../../types/label";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";
import { WPQTLabel } from "../../../../common/Label/WPQTLabel";

type Props = {
  labelToEdit: Label | null;
  editLabel: (label: Label) => Promise<void>;
  closeEdit?: () => void;
};
function LabelEdit({ labelToEdit, editLabel, closeEdit = () => {} }: Props) {
  if (!labelToEdit) {
    return null;
  }
  const [label, setLabel] = useState<Label>({ ...labelToEdit });
  const [loading, setLoading] = useState(false);

  const onLabelNameChange = (name: string) => {
    setLabel({ ...label, name });
  };
  const setLabelColor = (color: ColorResult) => {
    setLabel({ ...label, color: color.hex });
  };
  const onEdit = async () => {
    if (!label.name || !label.color) {
      return;
    }
    setLoading(true);
    await editLabel(label);
    setLoading(false);
  };
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3 wpqt-items-center">
      <div className="wpqt-text-lg">{__("Edit label", "quicktasker")}</div>
      <div className="wpqt-flex wpqt-flex-col">
        <WPQTLabel labelFor="edit-label-name">
          {__("Name", "quicktasker")}
        </WPQTLabel>
        <WPQTInput
          value={label.name}
          onChange={onLabelNameChange}
          inputId="edit-label-name"
        />
      </div>
      <Colorful
        color={label.color}
        disableAlpha={true}
        onChange={setLabelColor}
      />
      <WPQTButton
        btnText={__("Edit", "quicktasker")}
        onClick={onEdit}
        loading={loading}
      />
      <WPQTButton
        btnText={__("Cancel", "quicktasker")}
        buttonStyleType={ButtonStyleType.SECONDARY}
        onClick={closeEdit}
      />
    </div>
  );
}

export { LabelEdit };
