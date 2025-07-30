import { useEffect, useState } from "@wordpress/element";
import { CustomField } from "../../../../../types/custom-field";
import { CustomFieldTitle } from "./CustomFieldTitle";

type CheckboxCustomFieldProps = {
  initialValue: string;
  onChange: (value: string) => void;
  data: CustomField;
  disabled?: boolean;
};
function CheckboxCustomField({
  data,
  initialValue,
  onChange,
  disabled = false,
}: CheckboxCustomFieldProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked ? "true" : "false");
    onChange(e.target.checked ? "true" : "false");
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <input
        type="checkbox"
        checked={value === "true"}
        className="!wpqt-block"
        onChange={handleCheckboxChange}
        disabled={disabled}
      />
    </div>
  );
}

export { CheckboxCustomField, CheckboxCustomFieldProps };
