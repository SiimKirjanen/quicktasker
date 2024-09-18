import { User } from "../../../types/user";
import { formatDate } from "../../../utils/date";
import { WPQTCard, WPQTCardDataItem } from "../../Card/Card";
import { UserDropdown } from "../../Dropdown/UserDropdown/UserDropdown";
import { usePageLinks } from "../../../hooks/usePageLinks";

type Props = {
  user: User;
};

function UserListItem({ user }: Props) {
  const { userPage } = usePageLinks();
  const userIsActive = user.is_active;

  return (
    <WPQTCard
      title={user.name}
      description={user.description}
      dropdown={<UserDropdown user={user} />}
    >
      <WPQTCardDataItem
        label="Users page"
        value={"Link"}
        valueLink={userPage + "&code=" + user.page_hash}
      />
      <WPQTCardDataItem
        label="User created at"
        value={formatDate(user.created_at)}
      />
      <WPQTCardDataItem label="Email" value="TODO" />
      <WPQTCardDataItem label="Phone" value="TODO" />
      <WPQTCardDataItem label="Assigned tasks count" value="TODO" />
      <WPQTCardDataItem label="Set up completed" value="TODO" />
      <WPQTCardDataItem
        label="Status"
        value={userIsActive ? "Active" : "Disabled"}
        valueClassName={
          userIsActive
            ? "wpqt-text-qtTextGreen wpqt-font-bold"
            : "wpqt-text-qtTextRed wpqt-font-bold"
        }
      />
    </WPQTCard>
  );
}

export { UserListItem };
