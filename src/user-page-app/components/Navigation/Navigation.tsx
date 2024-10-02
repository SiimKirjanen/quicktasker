import { useNavigate } from "react-router-dom";
import { ArrowPathIcon, HomeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { LoadingOval } from "../../../components/Loading/Loading";
import { ProfileDropdown } from "../Dropdown/ProfileDropdown/ProfileDropdown";
import { useContext } from "@wordpress/element";
import { UserPageNotificationsContext } from "../../providers/UserPageNotificationsContextProvider";

type Props = {
  loading: boolean;
  onRefresh?: () => void;
};
function NavigationBar({ loading, onRefresh = () => {} }: Props) {
  const navigate = useNavigate();

  return (
    <div className="wpqt-grid wpqt-h-[60px] wpqt-grid-cols-[1fr_auto_1fr] wpqt-items-center wpqt-border-0 wpqt-border-t wpqt-border-solid wpqt-border-y-gray-300 wpqt-p-4 lg:wpqt-border-b lg:wpqt-border-t-0">
      <div className="wpqt-flex wpqt-gap-2">
        <HomeIcon
          onClick={() => navigate("/")}
          className="wpqt-size-8 wpqt-cursor-pointer"
        />
      </div>

      <div className="wpqt-text-center">
        {loading ? (
          <LoadingOval width="30" height="30" />
        ) : (
          <ArrowPathIcon
            className="wpqt-icon-blue wpqt-size-9 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
            onClick={onRefresh}
          />
        )}
      </div>

      <div className="wpqt-flex wpqt-items-center wpqt-justify-end wpqt-gap-3">
        <NotificationIcon />
        <ProfileDropdown />
      </div>
    </div>
  );
}

function NotificationIcon() {
  const navigate = useNavigate();
  const {
    state: { newComments },
  } = useContext(UserPageNotificationsContext);

  return (
    <>
      {newComments.length > 0 ? (
        <EnvelopeOpenIcon
          className="wpqt-icon-yellow wpqt-size-6 wpqt-cursor-pointer"
          onClick={() => {
            navigate("/notifications");
          }}
        />
      ) : (
        <EnvelopeIcon
          className="wpqt-icon-gray wpqt-size-6 wpqt-cursor-pointer"
          onClick={() => {
            navigate("/notifications");
          }}
        />
      )}
    </>
  );
}

export { NavigationBar };
