import { useEffect, useState } from "@wordpress/element";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../constants";
import { WPQTTextarea } from "../../TextArea/TextArea";

type AutoSaveTextareaProps = {
  value: string;
  onChange: (value: string) => Promise<void>;
  debounceTimeout?: number;
  className?: string;
};
function AutoSaveTextarea({
  value,
  onChange,
  debounceTimeout = TEXT_ENTER_DEBOUNCE_TIMEOUT,
  className,
}: AutoSaveTextareaProps) {
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
    <WPQTTextarea
      rowsCount={3}
      value={inputValue}
      className={className}
      onChange={handleChange}
      disabled={loading}
      loading={loading}
    />
  );
}

export { AutoSaveTextarea };
