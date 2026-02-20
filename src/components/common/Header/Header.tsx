type WPQTPageHeaderProps = {
  children: string;
  description: string;
  icon?: React.ReactNode;
  rightSideContent?: React.ReactNode;
};
function WPQTPageHeader({
  children,
  description,
  icon = null,
  rightSideContent = null,
}: WPQTPageHeaderProps) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-mb-6 wpqt-mt-6 wpqt-gap-3">
      <div className="wpqt-flex wpqt-items-center">
        <h1 className="wpqt-m-0">
          {children}
          {icon && <span className="wpqt-ml-1 wpqt-align-middle">{icon}</span>}
        </h1>
        {rightSideContent && (
          <div className="wpqt-ml-auto">{rightSideContent}</div>
        )}
      </div>
      <div>{description}</div>
    </div>
  );
}

export { WPQTPageHeader };
