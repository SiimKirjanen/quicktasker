import { Input } from "@headlessui/react";
import { forwardRef } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { InputErrorText } from "./InputErrorText/InputErrorText";

enum InputType {
  TEXT = "text",
  PASSWORD = "password",
}

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  isAutoFocus?: boolean;
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  type?: InputType;
  loading?: boolean;
  inputId?: string;
  name?: string;
  errorText?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  autoComplete?: string;
};

const WPQTInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      isAutoFocus,
      className = "",
      wrapperClassName = "",
      disabled = false,
      type = InputType.TEXT,
      loading = false,
      inputId,
      name,
      errorText,
      placeholder,
      leftIcon,
      autoComplete,
      ...restProps
    },
    ref,
  ) => {
    return (
      <div
        className={`wpqt-inline-block wpqt-relative wpqt-mb-3 ${wrapperClassName}`}
      >
        <Input
          ref={ref}
          autoFocus={isAutoFocus}
          className={`wpqt-block wpqt-box-border !wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${leftIcon ? "!wpqt-pl-7" : ""} ${className}`}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...restProps}
        />
        {leftIcon && (
          <span className="wpqt-absolute wpqt-left-2 wpqt-top-0 wpqt-bottom-0 wpqt-pointer-events-none wpqt-text-gray-400 wpqt-flex wpqt-items-center">
            {leftIcon}
          </span>
        )}
        {loading && (
          <LoadingOval
            width="24"
            height="24"
            className="wpqt-absolute wpqt-right-[-32px] wpqt-top-1/2 wpqt-transform-y-center"
          />
        )}
        {errorText && <InputErrorText errorText={errorText} />}
      </div>
    );
  },
);

export { InputType, WPQTInput };
