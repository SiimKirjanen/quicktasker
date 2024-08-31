import { User } from "../../../types/user";
import { formatDate } from "../../../utils/date";
import { WPQTCard, WPQTCardDataItem } from "../../Card/Card";
import { UserDropdown } from "../../Dropdown/UserDropdown/UserDropdown";

type Props = {
  user: User;
};

function UserListItem({ user }: Props) {
  return (
    <WPQTCard
      title={user.name}
      description={user.description}
      dropdown={<UserDropdown />}
    >
      <WPQTCardDataItem label="Users page" value="TODO" />
      <WPQTCardDataItem
        label="User created at"
        value={formatDate(user.created_at)}
      />
      <WPQTCardDataItem label="Email" value="TODO" />
      <WPQTCardDataItem label="Phone" value="TODO" />
      <WPQTCardDataItem label="Assigned tasks count" value="TODO" />
      <WPQTCardDataItem label="Password set" value="TODO" />
      <WPQTCardDataItem label="Status" value="TODO" />
    </WPQTCard>
  );
}

export { UserListItem };
