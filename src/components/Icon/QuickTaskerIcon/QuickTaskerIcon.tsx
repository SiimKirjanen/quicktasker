import icon from "../../../../img/icon-80x80.png";

type Props = {
  className?: string;
};
function QuickTaskerIcon({ className = "" }: Props) {
  return (
    <img
      src={icon}
      alt="QuickTasker Icon"
      className={`wpqt-size-[24px] ${className}`}
    />
  );
}

export { QuickTaskerIcon };
