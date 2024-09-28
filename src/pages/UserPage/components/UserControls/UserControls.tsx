import {
  PowerIcon,
  RectangleStackIcon,
  TrashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { WPQTIconButton } from "../../../../components/common/Button/Button";
import { useUserActions } from "../../../../hooks/actions/useUserActions";
import { ExtendedUser } from "../../../../types/user";
import { useContext } from "@wordpress/element";
import { UserContext } from "../../../../providers/UserContextProvider";
import { DELETE_USER, EDIT_USER } from "../../../../constants";

type Props = {
  data: ExtendedUser;
  changeStatus: (status: boolean) => void;
  changeSetUpStatus: (status: boolean) => void;
};
function UserControls({ data, changeStatus, changeSetUpStatus }: Props) {
  const { changeUserStatus, deleteUser, resetUserPassword } = useUserActions();
  const { userDispatch } = useContext(UserContext);
  const isUserActive = data.is_active;

  return (
    <div className="wpqt-mt-5 wpqt-flex wpqt-gap-2">
      <WPQTIconButton
        icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-5" />}
        text="User tasks"
        onClick={() => {
          window.location.hash = `#/users/${data.id}/tasks`;
        }}
      />
      {!isUserActive && (
        <WPQTIconButton
          icon={<PowerIcon className="wpqt-icon-green wpqt-size-5" />}
          text="Activate user"
          onClick={async () => {
            await changeUserStatus(data.id, true, (userData) => {
              userDispatch({
                type: EDIT_USER,
                payload: { ...userData },
              });
              changeStatus(true);
            });
          }}
        />
      )}
      {isUserActive && (
        <WPQTIconButton
          icon={<PowerIcon className="wpqt-icon-red wpqt-size-5" />}
          text="Disable user"
          onClick={async () => {
            await changeUserStatus(data.id, false, (userData) => {
              userDispatch({
                type: EDIT_USER,
                payload: { ...userData },
              });
              changeStatus(false);
            });
          }}
        />
      )}
      <WPQTIconButton
        icon={<KeyIcon className="wpqt-icon-red wpqt-size-5" />}
        text="Reset password"
        onClick={async () => {
          await resetUserPassword(data.id, () => {
            changeSetUpStatus(false);
          });
        }}
      />
      <WPQTIconButton
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
        text="Delete user"
        onClick={async () => {
          await deleteUser(data.id, (userId) => {
            userDispatch({
              type: DELETE_USER,
              payload: userId,
            });
            window.location.hash = `#/users`;
          });
        }}
      />
    </div>
  );
}

export { UserControls };
