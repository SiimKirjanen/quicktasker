import { Textarea } from "@headlessui/react";
import { clsx } from "clsx";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  rowsCount: number;
};
function WPQTTextarea({ value, onChange, rowsCount }: Props) {
  return (
    <Textarea
      className={clsx(
        "wpqt-border-1 wpqt-block wpqt-w-full wpqt-resize-none wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
        "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25",
      )}
      rows={rowsCount}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export { WPQTTextarea };
