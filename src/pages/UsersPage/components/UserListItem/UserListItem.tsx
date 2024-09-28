import { usePageLinks } from "../../../../hooks/usePageLinks";
import { User } from "../../../../types/user";
import { WPQTCard, WPQTCardDataItem } from "../../../../components/Card/Card";
import { UserDropdown } from "../../../../components/Dropdown/UserDropdown/UserDropdown";
import { formatDate } from "../../../../utils/date";

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
      onClick={() => {
        window.location.hash = `#/users/${user.id}`;
      }}
      className="wpqt-cursor-pointer"
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
