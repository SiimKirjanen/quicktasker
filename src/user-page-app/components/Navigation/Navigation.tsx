import { useNavigate } from "react-router-dom";
import { ArrowPathIcon, HomeIcon } from "@heroicons/react/24/outline";
import { LoadingOval } from "../../../components/Loading/Loading";

type Props = {
  loading: boolean;
  onRefresh?: () => void;
};
function NavigationBar({ loading, onRefresh = () => {} }: Props) {
  const navigate = useNavigate();

  return (
    <div className="wpqt-grid wpqt-h-[60px] wpqt-grid-cols-[1fr_auto_1fr] wpqt-items-center wpqt-p-4">
      <div className="wpqt-flex wpqt-gap-2">
        <HomeIcon
          onClick={() => navigate("/")}
          className="wpqt-size-5 wpqt-cursor-pointer"
        />
      </div>

      <div className="wpqt-text-center">
        {loading ? (
          <LoadingOval width="30" height="30" />
        ) : (
          <ArrowPathIcon className="wpqt-icon-blue wpqt-size-9 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover" />
        )}
      </div>

      <div className="wpqt-flex wpqt-justify-end wpqt-gap-2">
        <div>Messageas</div>
        <div>Profile</div>
      </div>
    </div>
  );
}

export { NavigationBar };
