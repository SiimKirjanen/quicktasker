import {
  KeyIcon,
  PowerIcon,
  RectangleStackIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTIconButton } from "../../../../components/common/Button/Button";
import { DELETE_USER, EDIT_USER } from "../../../../constants";
import { useUserActions } from "../../../../hooks/actions/useUserActions";
import { UserContext } from "../../../../providers/UserContextProvider";
import { ExtendedUser } from "../../../../types/user";

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
        text={__("User tasks", "quicktasker")}
        onClick={() => {
          window.location.hash = `#/users/${data.id}/tasks`;
        }}
      />
      {!isUserActive && (
        <WPQTIconButton
          icon={<PowerIcon className="wpqt-icon-green wpqt-size-5" />}
          text={__("Activate user", "quicktasker")}
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
          text={__("Disable user", "quicktasker")}
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
        text={__("Reset password", "quicktasker")}
        onClick={async () => {
          await resetUserPassword(data.id, () => {
            changeSetUpStatus(false);
          });
        }}
      />
      <WPQTIconButton
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
        text={__("Delete user", "quicktasker")}
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
