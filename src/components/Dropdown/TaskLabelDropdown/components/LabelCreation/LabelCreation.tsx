import { Colorful } from "@uiw/react-color";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_LABEL_ACTION_STATE_SELECTION } from "../../../../../constants";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";
import { InputErrorText } from "../../../../common/Input/InputErrorText/InputErrorText";
import { WPQTLabel } from "../../../../common/Label/WPQTLabel";

type Props = {
  labelCreated: (name: string, color: string) => void;
  loading?: boolean;
};
function LabelCreation({ labelCreated, loading = false }: Props) {
  const { labelDispatch } = useContext(LabelContext);
  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("#FF9800");
  const [labelErrors, setLabelErrors] = useState<{
    nameError?: string;
    colorError?: string;
  }>({});

  const onLabelCreate = () => {
    const errors: typeof labelErrors = {};

    if (!labelName.trim())
      errors.nameError = __("Name is required", "quicktasker");
    if (!labelColor) errors.colorError = __("Color is required", "quicktasker");

    setLabelErrors(errors);

    if (Object.keys(errors).length > 0) return;

    labelCreated(labelName, labelColor);
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3">
      <div>
        <div className="wpqt-text-lg">
          {__("Create new label", "quicktasker")}
        </div>
        <div className="wpqt-max-w-sm">
          {__("Label will be added to the board", "quicktasker")}
        </div>
      </div>
      <div className="wpqt-flex wpqt-flex-col">
        <WPQTLabel labelFor="new-label-name">
          {__("Name", "quicktasker")}
        </WPQTLabel>
        <WPQTInput
          value={labelName}
          onChange={setLabelName}
          inputId="new-label-name"
          errorText={labelErrors.nameError}
          className="wpqt-w-full"
        />
      </div>
      <div className="wpqt-flex wpqt-flex-col wpqt-mb-2">
        <WPQTLabel>{__("Color", "quicktasker")}</WPQTLabel>
        <Colorful
          color={labelColor}
          disableAlpha={true}
          onChange={(color) => {
            setLabelColor(color.hex);
          }}
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
          onClick={() => {
            labelDispatch({ type: SET_LABEL_ACTION_STATE_SELECTION });
          }}
        />
        <WPQTButton
          btnText={__("Create", "quicktasker")}
          onClick={onLabelCreate}
          loading={loading}
        />
      </div>
    </div>
  );
}

export { LabelCreation };
