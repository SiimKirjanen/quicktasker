import { useCallback, useEffect, useState } from "@wordpress/element";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { CustomFieldTitle } from "../../../../components/CustomField/CustomFields/components/CustomField/CustomField";
import { CustomField, CustomFieldType } from "../../../../types/custom-field";
import { debounce } from "../../../../utils/debounce";

type Props = {
  data: CustomField;
  saveCustomFieldValueChange: (customFieldId: string, value: string) => void;
  valueChangeEnabled?: boolean;
};
function CustomField({
  data,
  saveCustomFieldValueChange,
  valueChangeEnabled = true,
}: Props) {
  const handleChange = (value: string) => {
    saveCustomFieldValueChange(data.id, value);
  };
  switch (data.type) {
    case CustomFieldType.Text: {
      return (
        <TextCustomField
          data={data}
          onHandleChange={handleChange}
          valueChangeEnabled={valueChangeEnabled}
        />
      );
    }
    case CustomFieldType.Checkbox: {
      return (
        <CheckboxCustomField
          data={data}
          onHandleChange={handleChange}
          valueChangeEnabled={valueChangeEnabled}
        />
      );
    }
  }
}

type TextCustomFieldProps = {
  data: CustomField;
  onHandleChange: (value: string) => void;
  valueChangeEnabled: boolean;
};
function TextCustomField({
  data,
  onHandleChange,
  valueChangeEnabled,
}: TextCustomFieldProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(data.value || "");
  }, [data.value]);

  const debouncedHandleChange = useCallback(
    debounce((newValue: string) => {
      onHandleChange(newValue);
    }, 600),
    [onHandleChange],
  );

  const onChange = (newValue: string) => {
    setValue(newValue);
    debouncedHandleChange(newValue);
  };

  return (
    <div className="wpqt-text-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <WPQTInput
        value={value}
        onChange={onChange}
        disabled={!valueChangeEnabled}
      />
    </div>
  );
}

type CheckboxCustomFieldProps = {
  data: CustomField;
  onHandleChange: (value: string) => void;
  valueChangeEnabled: boolean;
};
function CheckboxCustomField({
  data,
  onHandleChange,
  valueChangeEnabled,
}: CheckboxCustomFieldProps) {
  const [isChecked, setIsChecked] = useState(data.value === "true");

  useEffect(() => {
    setIsChecked(data.value === "true");
  }, [data.value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onHandleChange(e.target.checked ? "true" : "false");
  };
  return (
    <div className="wpqt-text-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={!valueChangeEnabled}
      />
    </div>
  );
}

export { CustomField };
