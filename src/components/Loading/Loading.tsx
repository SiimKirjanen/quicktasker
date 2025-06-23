import { Oval } from "react-loader-spinner";

type LoadingOverProps = {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
  secondaryColor?: string;
};

function LoadingOval({
  width = "80",
  height = "80",
  className = "",
  color = "#1d4ed8",
  secondaryColor = "#2563eb",
}: LoadingOverProps) {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      color={color}
      secondaryColor={secondaryColor}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass={className}
    />
  );
}

function FullLoading() {
  return (
    <div className="wpqt-flex wpqt-h-screen-minus-top-bar wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <LoadingOval />
    </div>
  );
}

function Loading({
  className = "",
  ovalSize,
}: {
  className?: string;
  ovalSize?: string;
}) {
  const ovalProps = ovalSize ? { width: ovalSize, height: ovalSize } : {};

  return (
    <div
      className={`wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center ${className}`}
    >
      <LoadingOval {...ovalProps} />
    </div>
  );
}

export { FullLoading, Loading, LoadingOval };
