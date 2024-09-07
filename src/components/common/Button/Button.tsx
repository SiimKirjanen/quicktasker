import { Button } from "@headlessui/react";

type Props = {
  onClick: (() => {}) | (() => void);
  btnText: string;
};

function WPQTButton({ onClick, btnText }: Props) {
  return (
    <Button
      className="wpqt-cursor-pointer wpqt-rounded-md wpqt-px-3 wpqt-py-1 wpqt-text-sm/6"
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
}

export { WPQTButton };
