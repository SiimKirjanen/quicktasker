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
      className="wpqt-border-1 wpqt-block wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export { WPQTInput };
