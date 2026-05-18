import React from "react";

type WPQTPageHeaderProps = {
  children: string;
  description: string;
  icon?: React.ReactNode;
  rightSideContent?: React.ReactNode;
  readMoreLink?: React.ReactNode;
};
function WPQTPageHeader({
  children,
  description,
  icon = null,
  rightSideContent = null,
  readMoreLink = null,
}: WPQTPageHeaderProps) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-mb-6 wpqt-mt-6 wpqt-gap-3 lg:wpqt-grid lg:wpqt-grid-cols-[1fr_auto] lg:wpqt-gap-x-4">
      <h1 className="wpqt-m-0">
        {children}
        {icon && <span className="wpqt-ml-1 wpqt-align-middle">{icon}</span>}
      </h1>
      <div className="wpqt-whitespace-pre-line lg:wpqt-col-start-1 lg:wpqt-row-start-2">
        {description} {readMoreLink}
      </div>
      {rightSideContent && (
        <div className="lg:wpqt-col-start-2 lg:wpqt-row-start-1 lg:wpqt-row-span-2 lg:wpqt-self-center">
          {rightSideContent}
        </div>
      )}
    </div>
  );
}

export { WPQTPageHeader };
