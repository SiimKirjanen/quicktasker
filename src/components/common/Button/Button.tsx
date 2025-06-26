import { Button } from "@headlessui/react";
import { LoadingOval } from "../../Loading/Loading";
import { WPQTTooltip } from "../../Tooltip/WPQTTooltip";

enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}
enum ButtonStyleType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}
type Props = {
  onClick?: () => void;
  btnText: string;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  buttonStyleType?: ButtonStyleType;
};
function WPQTButton({
  onClick = () => {},
  btnText,
  className,
  type = ButtonType.BUTTON,
  disabled = false,
  loading = false,
  buttonStyleType = ButtonStyleType.PRIMARY,
}: Props) {
  const primaryClasses =
    "wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-blue-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-blue-800 enabled:hover:wpqt-bg-blue-600";
  const secondaryClasses =
    "wpqt-inline-flex wpqt-cursor-pointer wpqt-bg-gray-100 wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 enabled:hover:wpqt-bg-gray-200";
  const dangerClasses =
    "wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-red-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-red-800 enabled:hover:wpqt-bg-red-600";

  const buttonClasses =
    buttonStyleType === ButtonStyleType.PRIMARY
      ? primaryClasses
      : buttonStyleType === ButtonStyleType.SECONDARY
        ? secondaryClasses
        : dangerClasses;

  return (
    <Button
      disabled={disabled || loading}
      className={`${buttonClasses} ${className}`}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <LoadingOval
          width="24"
          height="24"
          color="#ffffff"
          secondaryColor="#ffffff"
        />
      ) : (
        btnText
      )}
    </Button>
  );
}

type WPQTIconButtonProps = {
  icon?: React.ReactNode;
  text?: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  tooltipId?: string;
  tooltipText?: string;
  loading?: boolean;
};
function WPQTIconButton({
  icon,
  text,
  onClick = () => {},
  className,
  tooltipId,
  tooltipText,
  loading = false,
}: WPQTIconButtonProps) {
  const showTooltip = tooltipText && tooltipId;
  const tooltipAttributes: React.HTMLAttributes<HTMLDivElement> = showTooltip
    ? {
        "data-tooltip-id": tooltipId,
        "data-tooltip-content": tooltipText,
        "data-tooltip-position-strategy": "fixed",
        "data-tooltip-variant": "info",
      }
    : {};

  return (
    <div
      {...tooltipAttributes}
      className={`wpqt-main-border wpqt-relative wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-bg-gray-100 wpqt-p-2 hover:wpqt-bg-white ${className}`}
      onClick={onClick}
    >
      {icon}
      {text || loading ? (
        <div className="wpqt-flex wpqt-gap-2 wpqt-items-center wpqt-relative">
          {text && (
            <span
              className={`wpqt-whitespace-nowrap ${loading ? "wpqt-invisible" : ""}`}
            >
              {text}
            </span>
          )}
          {loading && (
            <LoadingOval
              width="20"
              height="20"
              className="wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-center"
            />
          )}
        </div>
      ) : null}
      {showTooltip && <WPQTTooltip id={tooltipId} />}
    </div>
  );
}

type WPQTOnlyIconBtnProps = {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  loading?: boolean;
};
function WPQTOnlyIconBtn({
  icon,
  onClick = () => {},
  className,
  loading = false,
}: WPQTOnlyIconBtnProps) {
  return (
    <div
      className={`wpqt-main-border wpqt-p-1 wpqt-relative wpqt-inline-flex wpqt-cursor-pointer wpqt-bg-gray-100 hover:wpqt-bg-white ${className}`}
      onClick={onClick}
    >
      <div
        className={`wpqt-flex wpqt-items-center ${loading ? "wpqt-invisible" : ""}`}
      >
        {icon}
      </div>
      {loading && (
        <LoadingOval
          width="20"
          height="20"
          className="wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-center"
        />
      )}
    </div>
  );
}

export {
  ButtonStyleType,
  ButtonType,
  WPQTButton,
  WPQTIconButton,
  WPQTOnlyIconBtn,
};
