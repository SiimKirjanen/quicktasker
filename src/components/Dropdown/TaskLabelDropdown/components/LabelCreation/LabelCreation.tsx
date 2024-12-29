import { Colorful } from "@uiw/react-color";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_LABEL_ACTION_STATE_SELECTION } from "../../../../../constants";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";
import { WPQTLabel } from "../../../../common/Label/WPQTLabel";

type Props = {
  labelCreated: (name: string, color: string) => void;
  loading?: boolean;
};
function LabelCreation({ labelCreated, loading = false }: Props) {
  const { labelDispatch } = useContext(LabelContext);
  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("");

  const onLabelCreated = () => {
    if (!labelName || !labelColor) {
      return;
    }
    labelCreated(labelName, labelColor);
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3 wpqt-items-center">
      <div className="wpqt-text-lg">
        {__("Create new label", "quicktasker")}
      </div>
      <div className="wpqt-flex wpqt-flex-col">
        <WPQTLabel labelFor="new-label-name">
          {__("Name", "quicktasker")}
        </WPQTLabel>
        <WPQTInput
          value={labelName}
          onChange={setLabelName}
          inputId="new-label-name"
        />
      </div>

      <Colorful
        color={labelColor}
        disableAlpha={true}
        onChange={(color) => {
          setLabelColor(color.hex);
        }}
      />
      <WPQTButton
        btnText={__("Create", "quicktasker")}
        onClick={onLabelCreated}
        loading={loading}
      />
      <WPQTButton
        btnText={__("Cancel", "quicktasker")}
        buttonStyleType={ButtonStyleType.SECONDARY}
        onClick={() => {
          labelDispatch({ type: SET_LABEL_ACTION_STATE_SELECTION });
        }}
      />
    </div>
  );
}

export { LabelCreation };
