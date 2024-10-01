import {
  UserCircleIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  WPQTDropdown,
  WPQTDropdownItem,
} from "../../../../components/Dropdown/WPQTDropdown";
import { logoutUserPageRequest } from "../../../api/user-page-api";
import { useContext } from "@wordpress/element";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { useSession } from "../../../hooks/useSession";
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const {
    state: { pageHash },
    loadUserPageStatus,
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();
  const { deleteSessionCookie } = useSession();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await deleteSessionCookie();
      await logoutUserPageRequest(pageHash);
      loadUserPageStatus();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTDropdown
      menuBtnClasses=""
      anchor="bottom end"
      menuBtn={({ active }) => (
        <div>
          <UserCircleIcon
            className={`wpqt-size-9 ${active ? "wpqt-text-blue-800" : ""} hover:wpqt-text-blue-800`}
          />
        </div>
      )}
    >
      <WPQTDropdownItem
        text="View profile"
        icon={<UserIcon className="wpqt-icon-blue wpqt-size-4" />}
        onClick={() => {
          navigate("/user/profile");
        }}
      />

      <WPQTDropdownItem
        text="Log out"
        icon={
          <ArrowRightStartOnRectangleIcon className="wpqt-icon-blue wpqt-size-4" />
        }
        className="!wpqt-mb-0"
        onClick={logOut}
      />
    </WPQTDropdown>
  );
}

export { ProfileDropdown };
