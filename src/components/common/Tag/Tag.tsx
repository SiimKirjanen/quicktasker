type Props = {
  children: React.ReactNode;
  inlineStyle?: React.CSSProperties;
  className?: string;
};
function WPQTTag({ children, inlineStyle, className = "" }: Props) {
  return (
    <div
      className={`wpqt-inline-flex wpqt-py-1 wpqt-px-2 wpqt-font-semibold wpqt-text-xs wpqt-leading-none wpqt-shopping-tag ${className}`}
      style={inlineStyle}
    >
      {children}
    </div>
  );
}

export { WPQTTag };
