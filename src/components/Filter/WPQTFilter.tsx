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
      <div className={`wpqt-mb-2 wpqt-text-base ${titleClassName}`}>
        {title}
      </div>
      <div
        className={`wpqt-flex wpqt-gap-2 wpqt-items-center ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

export { WPQTFilter };
