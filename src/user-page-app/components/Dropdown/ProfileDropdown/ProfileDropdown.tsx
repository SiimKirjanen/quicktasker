import {
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
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
import { SET_USER_LOGGED_IN } from "../../../constants";

function ProfileDropdown() {
  const {
    state: { pageHash },
    loadUserPageStatus,
    userPageAppDispatch,
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();
  const { deleteSessionCookie } = useSession();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await deleteSessionCookie();
      await logoutUserPageRequest(pageHash);
      userPageAppDispatch({ type: SET_USER_LOGGED_IN, payload: false });
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
            className={`wpqt-icon-blue wpqt-size-11 ${active ? "wpqt-text-blue-900" : ""} hover:wpqt-text-blue-900`}
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
