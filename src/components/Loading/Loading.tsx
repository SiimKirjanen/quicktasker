import { Oval } from "react-loader-spinner";

function Loading() {
  return (
    <div className="wpqt-h-screen-minus-top-bar wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <div className="wpqt-mt-4 wpqt-text-xl wpqt-font-semibold">
        Loading...
      </div>
    </div>
  );
}

export { Loading };
