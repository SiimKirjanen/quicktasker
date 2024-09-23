import { usePageLinks } from "../../../hooks/usePageLinks";
import { ExtendedUser } from "../../../types/user";

type Props = {
  userData: ExtendedUser;
};
function UserDataSection({ userData }: Props) {
  const { userPage } = usePageLinks();
  return (
    <div>
      <div>Name: {userData.name}</div>
      <div>Description: {userData.description}</div>
      <div>Created at: {userData.created_at}</div>
      <div>Setup completed: {userData.setup_complete ? "Yes" : "No"}</div>
      <div>Assigned tasks count: {userData.assigned_tasks_count}</div>
      <div>Is active: {userData.is_active ? "Yes" : "No"}</div>
      <div>
        <a
          href={userPage + "&code=" + userData.page_hash}
          target="_blank"
          rel="noreferrer"
        >
          {userPage + "&code=" + userData.page_hash}
        </a>
      </div>
      <div></div>
    </div>
  );
}

export { UserDataSection };
