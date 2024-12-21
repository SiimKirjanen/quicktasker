type WPQTFilterProps = {
  children: React.ReactNode;
  title: string;
  childrenClassName?: string;
  titleClassName?: string;
};

function WPQTFilter({
  children,
  title,
  childrenClassName = "",
  titleClassName = "",
}: WPQTFilterProps) {
  return (
    <div className="wpqt-mb-8">
      <div
        className={`wpqt-mb-3 wpqt-text-lg wpqt-text-center ${titleClassName}`}
      >
        {title}
      </div>
      <div
        className={`wpqt-flex wpqt-gap-4 wpqt-items-center wpqt-justify-center ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

export { WPQTFilter };
