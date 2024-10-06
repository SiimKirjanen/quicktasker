import { useState } from "@wordpress/element";
import {
  CustomField,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { WPQTInput } from "../../../../common/Input/Input";

type Props = {
  data: CustomField;
};

function CustomField({ data }: Props) {
  let customFieldElement;

  switch (data.type) {
    case CustomFieldType.Text: {
      customFieldElement = <TextCustomField data={data} />;
      break;
    }
    case CustomFieldType.Checkbox: {
      customFieldElement = <CheckboxCustomField data={data} />;
      break;
    }
  }

  return customFieldElement;
}

function TextCustomField({ data }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <WPQTInput value={value} onChange={setValue} />
    </div>
  );
}

function CheckboxCustomField({ data }: Props) {
  const [value, setValue] = useState(false);

  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <input
        type="checkbox"
        checked={value}
        className="!wpqt-block"
        onChange={(e) => setValue(e.target.checked)}
      />
    </div>
  );
}

type CustomFieldTitleProps = {
  name: string;
  description: string | null;
};
function CustomFieldTitle({ name, description = "" }: CustomFieldTitleProps) {
  return (
    <>
      <div className="wpqt-mb-1 wpqt-text-base wpqt-font-semibold">{name}</div>
      {description && (
        <div className="wpqt-mb-2 wpqt-italic">{description}</div>
      )}
    </>
  );
}

export { CustomField };
