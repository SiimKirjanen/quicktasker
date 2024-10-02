import {
  TrashIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  EllipsisHorizontalIcon,
  PowerIcon,
  UserIcon,
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
import { useUserActions } from "../../../hooks/actions/useUserActions";

type Props = {
  user: User;
};
function UserDropdown({ user }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const { userDispatch } = useContext(UserContext);
  const { changeUserStatus, deleteUser } = useUserActions();
  const userIsActive = user.is_active;

  const openEditUserModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    modalDispatch({
      type: OPEN_EDIT_USER_MODAL,
      payload: user,
    });
  };

  const onChangeUserStatus = async (status: boolean) => {
    await changeUserStatus(user.id, status, () => {
      userDispatch({
        type: EDIT_USER,
        payload: { ...user, is_active: status ? "1" : "0" },
      });
    });
  };

  const onDeleteUser = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteUser(user.id, (userId) => {
      userDispatch({
        type: DELETE_USER,
        payload: userId,
      });
    });
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
        text="User details"
        icon={<UserIcon className="wpqt-icon-blue wpqt-size-4" />}
        onClick={(e) => {
          e.stopPropagation();
          window.location.hash = `#/users/${user.id}`;
        }}
      />

      <WPQTDropdownItem
        text="Edit user"
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={openEditUserModal}
      />

      <WPQTDropdownItem
        text="User tasks"
        icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-4" />}
        onClick={(e) => {
          e.stopPropagation();
          window.location.hash = `#/users/${user.id}/tasks`;
        }}
      />

      {userIsActive && (
        <WPQTDropdownItem
          text="Disable user"
          icon={<PowerIcon className="wpqt-icon-red wpqt-size-4" />}
          className="!wpqt-mb-0"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onChangeUserStatus(false);
          }}
        />
      )}

      {!userIsActive && (
        <>
          <WPQTDropdownItem
            text="Activate user"
            icon={<PowerIcon className="wpqt-icon-green wpqt-size-4" />}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onChangeUserStatus(true);
            }}
          />
          <WPQTDropdownItem
            text="Delete user"
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
            onClick={onDeleteUser}
          />
        </>
      )}
    </WPQTDropdown>
  );
}

export { UserDropdown };
