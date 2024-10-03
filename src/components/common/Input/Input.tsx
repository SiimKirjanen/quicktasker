import { Input } from "@headlessui/react";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  isAutoFocus?: boolean;
};

function WPQTInput({ value, onChange, isAutoFocus }: Props) {
  return (
    <Input
      autoFocus={isAutoFocus}
      className="wpqt-block wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export { WPQTInput };
