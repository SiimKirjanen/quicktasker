import { Input } from "@headlessui/react";
import { forwardRef } from "@wordpress/element";

enum InputType {
  TEXT = "text",
  PASSWORD = "password",
}

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  isAutoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  type?: InputType;
};

const WPQTInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      isAutoFocus,
      className,
      disabled = false,
      type = InputType.TEXT,
    },
    ref,
  ) => {
    return (
      <Input
        ref={ref}
        autoFocus={isAutoFocus}
        className={`wpqt-mb-3 wpqt-block wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    );
  },
);

export { InputType, WPQTInput };
