import { Colorful, ColorResult } from "@uiw/react-color";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Label } from "../../../../../types/label";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";
import { InputErrorText } from "../../../../common/Input/InputErrorText/InputErrorText";
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
  const [labelErrors, setLabelErrors] = useState<{
    nameError?: string;
    colorError?: string;
  }>({});

  const onLabelNameChange = (name: string) => {
    setLabel({ ...label, name });
  };

  const setLabelColor = (color: ColorResult) => {
    setLabel({ ...label, color: color.hex });
  };

  const onEdit = async () => {
    const errors: typeof labelErrors = {};

    if (!label.name.trim())
      errors.nameError = __("Name is required", "quicktasker");
    if (!label.color)
      errors.colorError = __("Color is required", "quicktasker");

    setLabelErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    await editLabel(label);
    setLoading(false);
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3">
      <div>
        <div className="wpqt-text-lg">{__("Edit label", "quicktasker")}</div>
        <div className="wpqt-max-w-sm">
          {__("Make changes to this label", "quicktasker")}
        </div>
      </div>
      <div className="wpqt-flex wpqt-flex-col">
        <WPQTLabel labelFor="edit-label-name">
          {__("Name", "quicktasker")}
        </WPQTLabel>
        <WPQTInput
          value={label.name}
          onChange={onLabelNameChange}
          inputId="edit-label-name"
          className="wpqt-w-full"
          errorText={labelErrors.nameError}
        />
      </div>
      <div className="wpqt-flex wpqt-flex-col wpqt-mb-2">
        <WPQTLabel>{__("Color", "quicktasker")}</WPQTLabel>
        <Colorful
          color={label.color}
          disableAlpha={true}
          onChange={setLabelColor}
          style={{ width: "100%" }}
        />
        {labelErrors.nameError && (
          <InputErrorText errorText={labelErrors.colorError} />
        )}
      </div>
      <div className="wpqt-flex wpqt-gap-2 wpqt-justify-end">
        <WPQTButton
          btnText={__("Cancel", "quicktasker")}
          buttonStyleType={ButtonStyleType.SECONDARY}
          onClick={closeEdit}
        />
        <WPQTButton
          btnText={__("Update", "quicktasker")}
          onClick={onEdit}
          loading={loading}
        />
      </div>
    </div>
  );
}

export { LabelEdit };
