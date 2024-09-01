import {
  TrashIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  EllipsisHorizontalIcon,
  NoSymbolIcon,
  PlayCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";
import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import {
  DELETE_USER,
  EDIT_USER,
  OPEN_EDIT_USER_MODAL,
} from "../../../constants";
import { User } from "../../../types/user";
import { UserContext } from "../../../providers/UserContextProvider";
import { toast } from "react-toastify";
import { changeUserStatusRequest, deleteUserRequest } from "../../../api/api";

type Props = {
  user: User;
};
function UserDropdown({ user }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const { userDispatch } = useContext(UserContext);
  const userIsActive = user.is_active;

  const openEditUserModal = () => {
    modalDispatch({
      type: OPEN_EDIT_USER_MODAL,
      payload: user,
    });
  };

  const changeUserStatus = async (status: boolean) => {
    try {
      const response = await changeUserStatusRequest(user, status);

      userDispatch({
        type: EDIT_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to disable user. Please try again");
    }
  };

  const deleteUser = async () => {
    try {
      await deleteUserRequest(user);

      userDispatch({
        type: DELETE_USER,
        payload: user.id,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user. Please try again");
    }
  };

  return (
    <WPQTDropdown
      menuBtn={({ active }) => (
        <WPQTDropdownIcon
          isActive={active}
          IconComponent={EllipsisHorizontalIcon}
        />
      )}
    >
      <WPQTDropdownItem
        text="Edit user"
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={openEditUserModal}
      />
      <WPQTDropdownItem
        text="User tasks"
        icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-4" />}
      />

      {userIsActive && (
        <WPQTDropdownItem
          text="Disable user"
          icon={<PowerIcon className="wpqt-icon-red wpqt-size-4" />}
          className="!wpqt-mb-0"
          onClick={() => changeUserStatus(false)}
        />
      )}

      {!userIsActive && (
        <>
          <WPQTDropdownItem
            text="Activate user"
            icon={<PowerIcon className="wpqt-icon-green wpqt-size-4" />}
            onClick={() => changeUserStatus(true)}
          />
          <WPQTDropdownItem
            text="Delete user"
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
            onClick={deleteUser}
          />
        </>
      )}
    </WPQTDropdown>
  );
}

export { UserDropdown };
