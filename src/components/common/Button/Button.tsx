import { Button } from "@headlessui/react";
import { LoadingOval } from "../../Loading/Loading";

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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

export { ButtonStyleType, ButtonType, WPQTButton };
