import { Button } from "@headlessui/react";

type Props = {
  onClick: () => void;
  btnText: string;
};

function WPQTButton({ onClick, btnText }: Props) {
  return (
    <Button
      className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[open]:wpqt-bg-gray-700 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white"
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
}

export { WPQTButton };
