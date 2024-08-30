import { User } from "../../../types/user";
import { formatDate } from "../../../utils/date";
import { WPQTCard, WPQTCardDataItem } from "../../Card/Card";

type Props = {
  user: User;
};

function UserListItem({ user }: Props) {
  return (
    <WPQTCard title={user.name} description={user.description}>
      <WPQTCardDataItem
        label="Created at"
        value={formatDate(user.created_at)}
      />
    </WPQTCard>
  );
}

export { UserListItem };
