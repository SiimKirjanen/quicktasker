import { Select } from "@headlessui/react";

type Option = {
  value: string;
  label: string;
};
type Props = {
  options: Option[];
  selectedOptionValue: string;
  onSelectionChange: (selectedValue: string) => void;
  allSelector?: boolean;
  className?: string;
};

function WPQTSelect({
  options,
  selectedOptionValue,
  onSelectionChange,
  allSelector = true,
  className,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectionChange(selectedValue);
  };

  return (
    <Select
      value={selectedOptionValue}
      onChange={handleChange}
      className={`wpqt-p-2 ${className}`}
    >
      {allSelector && <option value="">All boards</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export { WPQTSelect, type Option };
