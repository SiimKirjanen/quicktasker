import { Oval } from "react-loader-spinner";

type LoadingOverProps = {
  width?: string;
  height?: string;
};

function LoadingOval({ width = "80", height = "80" }: LoadingOverProps) {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

function FullLoading() {
  return (
    <div className="wpqt-flex wpqt-h-screen-minus-top-bar wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <LoadingOval />
      <div className="wpqt-mt-4 wpqt-text-xl wpqt-font-semibold">
        Loading...
      </div>
    </div>
  );
}

function Loading({ className }: { className?: string }) {
  return (
    <div
      className={`wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center ${className}`}
    >
      <LoadingOval />
    </div>
  );
}

export { FullLoading, LoadingOval, Loading };
