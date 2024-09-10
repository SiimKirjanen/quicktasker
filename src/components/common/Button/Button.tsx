import { Button } from "@headlessui/react";

type Props = {
  onClick: (() => {}) | (() => void);
  btnText: string;
};

function WPQTButton({ onClick, btnText }: Props) {
  return (
    <Button
      className="wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-blue-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-blue-800 enabled:hover:wpqt-bg-blue-600"
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
}

export { WPQTButton };
