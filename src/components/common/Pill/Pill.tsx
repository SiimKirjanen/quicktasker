type Props = {
  value: string;
  label: string;
  onClick?: (value: string) => void;
  className?: string;
};
function Pill({ value, label, onClick = () => {}, className = "" }: Props) {
  return (
    <div
      className={`wpqt-inline-flex wpqt-font-semibold wpqt-rounded-xl wpqt-px-4 wpqt-py-2 wpqt-border wpqt-border-solid wpqt-cursor-pointer wpqt-border-qtBorder ${className}`}
      onClick={() => {
        onClick(value);
      }}
    >
      {label}
    </div>
  );
}

export { Pill };
