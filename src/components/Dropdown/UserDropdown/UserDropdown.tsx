import {
  TrashIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";
import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { OPEN_EDIT_USER_MODAL } from "../../../constants";
import { User } from "../../../types/user";

type Props = {
  user: User;
};
function UserDropdown({ user }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  const openEditUserModal = () => {
    modalDispatch({
      type: OPEN_EDIT_USER_MODAL,
      payload: user,
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
        text="Edit user"
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
        onClick={openEditUserModal}
      />
      <WPQTDropdownItem
        text="User tasks"
        icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-4" />}
      />

      <WPQTDropdownItem
        text="Disable user"
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { UserDropdown };
