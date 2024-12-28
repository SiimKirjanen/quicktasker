import { Colorful } from "@uiw/react-color";
import { useState } from "@wordpress/element";
import { WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";

type Props = {
  labelCreated: (name: string, color: string) => void;
  loading?: boolean;
};
function LabelCreation({ labelCreated, loading = false }: Props) {
  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("");

  const onLabelCreated = () => {
    if (!labelName || !labelColor) {
      return;
    }
    labelCreated(labelName, labelColor);
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
      <WPQTInput value={labelName} onChange={setLabelName} />
      <Colorful
        color={labelColor}
        disableAlpha={true}
        onChange={(color) => {
          setLabelColor(color.hex);
        }}
      />
      <WPQTButton btnText="Create" onClick={onLabelCreated} loading={loading} />
    </div>
  );
}

export { LabelCreation };
