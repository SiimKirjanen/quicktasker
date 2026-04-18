import icon from "../../../../img/icon-80x80.png";

type Props = {
  className?: string;
  size?: number;
};
function QuickTaskerIcon({ className = "", size = 24 }: Props) {
  return (
    <img
      src={icon}
      width={size}
      height={size}
      className={`${className}`}
      data-testid="quicktasker-icon"
    />
  );
}

export { QuickTaskerIcon };
