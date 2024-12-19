type WPQTCardDataItemProps = {
  label: string;
  value?: string;
  valueClassName?: string;
  valueLink?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  labelClassName?: string;
};

function WPQTCardDataItem({
  label,
  value,
  valueClassName = "",
  valueLink,
  icon,
  onClick = () => {},
  className = "",
  labelClassName = "",
}: WPQTCardDataItemProps) {
  return (
    <div
      className={`wpqt-mb-2 wpqt-flex wpqt-gap-2 wpqt-items-center ${className}`}
      onClick={onClick}
    >
      {icon && icon}
      <div className={labelClassName}>{value ? `${label}:` : label}</div>

      <div className={`${valueClassName}`}>
        {valueLink ? (
          <a
            href={valueLink}
            target="_blank"
            className="wpqt-text-qtTextBlue wpqt-no-underline"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export { WPQTCardDataItem };
