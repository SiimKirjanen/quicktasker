import { LoadingOval } from "../../../Loading/Loading";

type WPQTOnlyIconBtnProps = {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  loading?: boolean;
};
function WPQTOnlyIconBtn({
  icon,
  onClick = () => {},
  className,
  loading = false,
}: WPQTOnlyIconBtnProps) {
  return (
    <div
      className={`wpqt-main-border wpqt-p-1 wpqt-relative wpqt-inline-flex wpqt-cursor-pointer wpqt-bg-gray-100 hover:wpqt-bg-white ${className}`}
      onClick={onClick}
    >
      <div
        className={`wpqt-flex wpqt-items-center ${loading ? "wpqt-invisible" : ""}`}
      >
        {icon}
      </div>
      {loading && (
        <LoadingOval
          width="20"
          height="20"
          className="wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-center"
        />
      )}
    </div>
  );
}

export { WPQTOnlyIconBtn };
