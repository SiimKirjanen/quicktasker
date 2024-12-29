type Props = {
  children: string;
  labelFor?: string;
  className?: string;
};
function WPQTLabel({ children, labelFor, className = "" }: Props) {
  return (
    <label className={`wpqt-mb-1 ${className}`} htmlFor={labelFor}>
      {children}
    </label>
  );
}

export { WPQTLabel };
