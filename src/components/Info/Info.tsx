type Props = {
  infoText: string;
  infoDescription: string;
  actionIcon?: React.ReactNode;
  infoActionClick?: () => void;
  secondaryInfoText?: string;
  secondaryInfoActionClick?: () => void;
};

function Info({
  infoText,
  infoDescription,
  actionIcon,
  infoActionClick,
  secondaryInfoText,
  secondaryInfoActionClick,
}: Props) {
  return (
    <div className="wpqt-flex wpqt-h-screen-minus-top-bar wpqt-items-center wpqt-justify-center">
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-1">
        <div
          className="wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-cursor-pointer"
          onClick={infoActionClick}
        >
          {actionIcon}
          <p className="wpqt-m-0 wpqt-font-semibold wpqt-text-lg">{infoText}</p>
        </div>
        <p>{infoDescription}</p>
        {secondaryInfoText && (
          <p
            className={`wpqt-m-0 wpqt-blue-text wpqt-blue-text-hover ${
              secondaryInfoActionClick ? "wpqt-cursor-pointer" : ""
            }`}
            onClick={secondaryInfoActionClick || undefined}
          >
            {secondaryInfoText}
          </p>
        )}
      </div>
    </div>
  );
}

export { Info };
