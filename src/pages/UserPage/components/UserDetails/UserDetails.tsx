import { ExtendedUser } from "../../../../types/user";
import { usePageLinks } from "../../../../hooks/usePageLinks";

import {
  DataDisplay,
  DisplayRow,
} from "../../../../components/common/DataDisplay/DataDisplay";

type Props = {
  data: ExtendedUser;
};
function UserDetails({ data }: Props) {
  const { userPage } = usePageLinks();
  const isActive = data.is_active;

  return (
    <div>
      <DataDisplay>
        <DisplayRow label="Name">{data.name}</DisplayRow>
        <DisplayRow label="Description">{data.description}</DisplayRow>
        <DisplayRow label="Created at">{data.created_at}</DisplayRow>
        <DisplayRow label="Setup completed">
          {data.setup_completed ? "Yes" : "No"}
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
    </div>
  );
}

export { UserDetails };
