import { useEffect, useState } from "@wordpress/element";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../constants";
import { WPQTInput } from "../Input";

type AutoSaveInputProps = {
  value: string;
  onChange: (value: string) => Promise<void>;
  debounceTimeout?: number;
  isAutoFocus?: boolean;
  wrapperClassName?: string;
  className?: string;
};

function AutoSaveInput({
  value,
  onChange,
  debounceTimeout = TEXT_ENTER_DEBOUNCE_TIMEOUT,
  isAutoFocus = false,
  wrapperClassName,
  className,
}: AutoSaveInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!dirty) return;
    const timeout = setTimeout(async () => {
      setDirty(false);
      setLoading(true);
      await onChange(inputValue);
      setLoading(false);
    }, debounceTimeout);

    return () => clearTimeout(timeout);
  }, [inputValue, dirty, debounceTimeout, onChange]);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    setDirty(true);
  };

  return (
    <WPQTInput
      isAutoFocus={isAutoFocus}
      value={inputValue}
      onChange={handleChange}
      wrapperClassName={wrapperClassName}
      className={className}
      loading={loading}
      disabled={loading}
    />
  );
}

export { AutoSaveInput };
