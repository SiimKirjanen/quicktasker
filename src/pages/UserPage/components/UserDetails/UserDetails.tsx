import { __ } from "@wordpress/i18n";
import { usePageLinks } from "../../../../hooks/usePageLinks";
import { ExtendedUser } from "../../../../types/user";

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
        <DisplayRow label={__("Name", "quicktasker")}>{data.name}</DisplayRow>
        <DisplayRow label={__("Description", "quicktasker")}>
          {data.description}
        </DisplayRow>
        <DisplayRow label={__("Created at", "quicktasker")}>
          {data.created_at}
        </DisplayRow>
        <DisplayRow label={__("Setup completed", "quicktasker")}>
          {data.setup_completed
            ? __("Yes", "quicktasker")
            : __("No", "quicktasker")}
        </DisplayRow>
        <DisplayRow label={__("Assigned tasks count", "quicktasker")}>
          {data.assigned_tasks_count}
        </DisplayRow>
        <DisplayRow label={__("Is active", "quicktasker")}>
          {isActive ? __("Yes", "quicktasker") : __("No", "quicktasker")}
        </DisplayRow>
        <DisplayRow label={__("User Page", "quicktasker")}>
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
