import { useState } from "@wordpress/element";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { CustomField, CustomFieldType } from "../../../../types/custom-field";
import { CustomFieldTitle } from "../../../../components/CustomField/CustomFields/components/CustomField/CustomField";

type Props = {
  data: CustomField;
  saveCustomFieldValueChange: (customFieldId: string, value: string) => void;
};
function CustomField({ data, saveCustomFieldValueChange }: Props) {
  const handleChange = (value: string) => {
    saveCustomFieldValueChange(data.id, value);
  };

  switch (data.type) {
    case CustomFieldType.Text: {
      return <TextCustomField data={data} onHandleChange={handleChange} />;
    }
    case CustomFieldType.Checkbox: {
      return <CheckboxCustomField data={data} onHandleChange={handleChange} />;
    }
  }
}

type TextCustomFieldProps = {
  data: CustomField;
  onHandleChange: (value: string) => void;
};
function TextCustomField({ data, onHandleChange }: TextCustomFieldProps) {
  const [value, setValue] = useState(data.value || "");

  const onChange = (newValue: string) => {
    setValue(newValue);
    onHandleChange(newValue);
  };

  return (
    <div className="wpqt-text-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <WPQTInput value={value} onChange={onChange} />
    </div>
  );
}

type CheckboxCustomFieldProps = {
  data: CustomField;
  onHandleChange: (value: string) => void;
};
function CheckboxCustomField({
  data,
  onHandleChange,
}: CheckboxCustomFieldProps) {
  const [isChecked, setIsChecked] = useState(data.value === "true");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onHandleChange(e.target.checked ? "true" : "false");
  };
  return (
    <div className="wpqt-text-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <input type="checkbox" checked={isChecked} onChange={onChange} />
    </div>
  );
}

export { CustomField };
