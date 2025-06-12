import { WPQTLabel } from "../common/Label/WPQTLabel";

type Props = {
  children?: React.ReactNode;
  searchChildren: React.ReactNode;
  applyFilterChildren?: React.ReactNode;
  title: string;
  childrenClassName?: string;
  titleClassName?: string;
};

function WPQTFilter({
  children,
  searchChildren,
  applyFilterChildren,
  title,
  childrenClassName = "",
  titleClassName = "",
}: Props) {
  return (
    <div className="wpqt-mb-8">
      <div
        className={`wpqt-mb-3 wpqt-text-lg wpqt-text-center wpqt-font-semibold ${titleClassName}`}
      >
        {title}
      </div>
      <div className="wpqt-mb-3 wpqt-flex wpqt-items-center wpqt-justify-center wpqt-gap-2">
        {searchChildren}
      </div>
      <div
        className={`wpqt-flex wpqt-gap-5 wpqt-items-center wpqt-justify-center wpqt-mb-6 ${childrenClassName}`}
      >
        {children}
      </div>
      <div className="wpqt-flex wpqt-justify-center">{applyFilterChildren}</div>
    </div>
  );
}

function WPQTFilterSection({
  children,
  title,
  className = "",
  labelIdFor,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  labelIdFor?: string;
}) {
  return (
    <div className={`wpqt-flex wpqt-flex-col ${className}`}>
      <WPQTLabel labelFor={labelIdFor}>{title}</WPQTLabel>
      {children}
    </div>
  );
}

export { WPQTFilter, WPQTFilterSection };
