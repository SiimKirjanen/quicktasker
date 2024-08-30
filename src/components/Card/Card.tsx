import { clsx } from "clsx";

type WPQTCardProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
  onClick?: () => void;
  dropdown?: React.ReactNode;
};

function WPQTCard({
  className,
  onClick,
  title,
  description,
  children,
  dropdown,
}: WPQTCardProps) {
  const hasDropdown = dropdown !== undefined;

  return (
    <div
      className={clsx(
        "wpqt-relative wpqt-flex wpqt-flex-col wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-3",
        hasDropdown && "wpqt-pr-[24px]",
        className,
      )}
      onClick={onClick}
    >
      <div className="wpqt-mb-2">
        <div className="wpqt-text-lg">{title}</div>
        {description && <div className="wpqt-italic">{description}</div>}
      </div>
      <div>{children}</div>
      {hasDropdown && (
        <div className="wpqt-absolute wpqt-right-2 wpqt-top-1 wpqt-z-10">
          {dropdown}
        </div>
      )}
    </div>
  );
}

function WPQTCardDataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="wpqt-mb-1 wpqt-flex wpqt-gap-1">
      <div>{label}:</div>
      <div>{value}</div>
    </div>
  );
}

export { WPQTCard, WPQTCardDataItem };
