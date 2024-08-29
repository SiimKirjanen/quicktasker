import { Select } from "@headlessui/react";

type Option = {
  value: string;
  label: string;
};
type Props = {
  options: Option[];
  selectedOptionValue: string;
  onSelectionChange: (selectedValue: string) => void;
};

function WPQTSelect({
  options,
  selectedOptionValue,
  onSelectionChange,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectionChange(selectedValue);
  };

  return (
    <Select
      name="pipeline-filtering"
      value={selectedOptionValue}
      onChange={handleChange}
    >
      <option value="">All boards</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export { WPQTSelect };
