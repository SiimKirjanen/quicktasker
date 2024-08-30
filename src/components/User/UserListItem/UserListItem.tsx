import { User } from "../../../types/user";
import { formatDate } from "../../../utils/date";

type Props = {
  user: User;
};

function UserListItem({ user }: Props) {
  return (
    <div className="wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-3">
      <div>Name: {user.name}</div>
      <div>Desscription: {user.description}</div>
      <div>Creation date: {formatDate(user.created_at)}</div>
      <div>Controls</div>
    </div>
  );
}

export { UserListItem };
