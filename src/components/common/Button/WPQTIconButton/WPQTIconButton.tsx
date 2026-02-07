import { LoadingOval } from "../../../Loading/Loading";
import { WPQTTooltip } from "../../../Tooltip/WPQTTooltip";

type WPQTIconButtonProps = {
  icon?: React.ReactNode;
  text?: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  tooltipId?: string;
  tooltipText?: string;
  loading?: boolean;
  disabled?: boolean;
};
function WPQTIconButton({
  icon,
  text,
  onClick,
  className,
  tooltipId,
  tooltipText,
  loading = false,
  disabled = false,
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
      className={`wpqt-main-border wpqt-relative wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-bg-gray-100 wpqt-p-2 hover:wpqt-bg-white ${disabled ? "wpqt-opacity-50" : ""} ${className}`}
      onClick={disabled || loading ? undefined : onClick}
      aria-disabled={disabled}
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

export { WPQTIconButton };
