type Props = {
  infoTitle?: string;
  infoDescription: string;
  infoTitleClick?: () => void;
  children?: React.ReactNode;
};

function Info({ infoTitle, infoDescription, infoTitleClick, children }: Props) {
  return (
    <div className="wpqt-flex wpqt-h-screen-minus-top-bar wpqt-items-center wpqt-justify-center">
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-1">
        {infoTitle && (
          <div
            className={`wpqt-flex wpqt-items-center wpqt-gap-2 ${
              infoTitleClick ? "wpqt-cursor-pointer" : ""
            }`}
            onClick={infoTitleClick || undefined}
          >
            <p className="wpqt-m-0 wpqt-font-semibold wpqt-text-lg">
              {infoTitle}
            </p>
          </div>
        )}
        <p>{infoDescription}</p>
        {children}
      </div>
    </div>
  );
}

export { Info };
