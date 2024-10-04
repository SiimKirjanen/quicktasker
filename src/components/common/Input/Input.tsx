import { Input } from "@headlessui/react";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  isAutoFocus?: boolean;
  className?: string;
};

function WPQTInput({ value, onChange, isAutoFocus, className }: Props) {
  return (
    <Input
      autoFocus={isAutoFocus}
      className={`wpqt-mb-3 wpqt-block wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export { WPQTInput };
