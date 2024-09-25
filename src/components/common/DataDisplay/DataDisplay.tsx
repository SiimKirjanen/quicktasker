type Props = {
  children: React.ReactNode;
};
function DataDisplay({ children }: Props) {
  return <div>{children}</div>;
}

type RowProps = {
  children: React.ReactNode;
  label: string;
};
function DisplayRow({ children, label }: RowProps) {
  return (
    <div className="wpqt-mb-2">
      <span className="wpqt-font-bold">{label}: </span>
      {children}
    </div>
  );
}

export { DataDisplay, DisplayRow };
