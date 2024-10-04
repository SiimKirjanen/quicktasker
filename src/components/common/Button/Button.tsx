import { Button } from "@headlessui/react";

type Props = {
  onClick: () => void;
  btnText: string;
  className?: string;
};

function WPQTButton({ onClick, btnText, className }: Props) {
  return (
    <Button
      className={`wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-blue-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-blue-800 enabled:hover:wpqt-bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
}

type WPQTIconButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  className?: string;
};
function WPQTIconButton({
  icon,
  text,
  onClick = () => {},
  className,
}: WPQTIconButtonProps) {
  return (
    <div
      className={`wpqt-main-border wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-bg-gray-100 wpqt-p-2 hover:wpqt-bg-white ${className}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </div>
  );
}

export { WPQTButton, WPQTIconButton };
