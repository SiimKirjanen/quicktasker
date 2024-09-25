import {
  PowerIcon,
  RectangleStackIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { usePageLinks } from "../../../hooks/usePageLinks";
import { ExtendedUser } from "../../../types/user";
import { WPQTIconButton } from "../../common/Button/Button";
import { DataDisplay, DisplayRow } from "../../common/DataDisplay/DataDisplay";
import { useUserActions } from "../../../hooks/actions/useUserActions";
import { useContext } from "@wordpress/element";
import { UserContext } from "../../../providers/UserContextProvider";
import { DELETE_USER, EDIT_USER } from "../../../constants";

type Props = {
  data: ExtendedUser;
  changeStatus: (status: boolean) => void;
};
function UserDetails({ data, changeStatus }: Props) {
  const { userPage } = usePageLinks();
  const { changeUserStatus, deleteUser } = useUserActions();
  const { userDispatch } = useContext(UserContext);
  const isActive = data.is_active;

  return (
    <div>
      <DataDisplay>
        <DisplayRow label="Name">{data.name}</DisplayRow>
        <DisplayRow label="Description">{data.description}</DisplayRow>
        <DisplayRow label="Created at">{data.created_at}</DisplayRow>
        <DisplayRow label="Setup completed">
          {data.setup_complete ? "Yes" : "No"}
        </DisplayRow>
        <DisplayRow label="Assigned tasks count">
          {data.assigned_tasks_count}
        </DisplayRow>
        <DisplayRow label="Is active">{isActive ? "Yes" : "No"}</DisplayRow>
        <DisplayRow label="User Page">
          <a
            href={userPage + "&code=" + data.page_hash}
            target="_blank"
            rel="noreferrer"
          >
            {userPage + "&code=" + data.page_hash}
          </a>
        </DisplayRow>
      </DataDisplay>
      <div className="wpqt-mt-5 wpqt-flex wpqt-gap-2">
        <WPQTIconButton
          icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-5" />}
          text="User tasks"
          onClick={() => {
            window.location.hash = `#/users/${data.id}/tasks`;
          }}
        />
        {!isActive && (
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
        {isActive && (
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
    </div>
  );
}

export { UserDetails };
