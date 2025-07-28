import { useEffect, useState } from "@wordpress/element";
import { CustomField } from "../../../../../types/custom-field";
import { WPQTInput } from "../../../../common/Input/Input";
import { CustomFieldTitle } from "./CustomFieldTitle";

type TextCustomFieldProps = {
  initialValue: string;
  onChange: (value: string) => void;
  data: CustomField;
  disabled?: boolean;
};
function TextCustomField({
  data,
  initialValue,
  onChange,
  disabled = false,
}: TextCustomFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setValue(initialValue);
    setDirty(false);
  }, [initialValue]);

  useEffect(() => {
    if (!dirty) return;
    const timeout = setTimeout(() => {
      onChange(value);
      setDirty(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, dirty, onChange]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setDirty(true);
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <WPQTInput value={value} onChange={handleChange} disabled={disabled} />
    </div>
  );
}

export { TextCustomField, TextCustomFieldProps };
