import { clsx } from "clsx";

type WPQTCardProps = {
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  title: string;
  description?: string;
  onClick?: () => void;
  dropdown?: React.ReactNode;
  childrenClassName?: string;
  style?: React.CSSProperties;
};

function WPQTCard({
  className,
  onClick,
  title,
  description,
  children,
  dropdown,
  titleClassName = "",
  style = {},
}: WPQTCardProps) {
  const hasDropdown = dropdown !== undefined;

  return (
    <div
      className={clsx(
        "wpqt-relative wpqt-flex wpqt-flex-col wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-4",
        hasDropdown && "wpqt-pr-[24px]",
        className,
      )}
      style={style}
      onClick={onClick}
    >
      <div className="wpqt-mb-3">
        <div className={`wpqt-text-lg ${titleClassName}`}>{title}</div>
        {description && (
          <div className="wpqt-italic wpqt-text-gray-500">{description}</div>
        )}
      </div>
      <div className="wpqt-flex wpqt-flex-col wpqt-h-full">{children}</div>
      {hasDropdown && (
        <div className="wpqt-absolute wpqt-right-2 wpqt-top-1 wpqt-z-10">
          {dropdown}
        </div>
      )}
    </div>
  );
}

export { WPQTCard };
