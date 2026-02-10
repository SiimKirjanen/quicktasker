import { Textarea } from "@headlessui/react";
import { clsx } from "clsx";
import { LoadingOval } from "../../Loading/Loading";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  rowsCount?: number;
  colsCount?: number;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  wrapperClassName?: string;
  placeholder?: string;
};

function WPQTTextarea({
  value,
  onChange,
  rowsCount = 3,
  colsCount,
  className = "",
  disabled = false,
  loading = false,
  wrapperClassName = "",
  placeholder = "",
}: Props) {
  return (
    <div className={`wpqt-relative wpqt-mb-3 ${wrapperClassName}`}>
      <Textarea
        className={clsx(
          "wpqt-border-1 wpqt-mb-3 wpqt-block wpqt-w-auto wpqt-resize-none wpqt-rounded-lg wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
          `focus:wpqt-shadow-none focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`,
        )}
        rows={rowsCount}
        cols={colsCount}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
      {loading && (
        <LoadingOval
          width="24"
          height="24"
          className="wpqt-absolute wpqt-right-[-32px] wpqt-top-1/2 wpqt-transform-y-center"
        />
      )}
    </div>
  );
}

export { WPQTTextarea };
