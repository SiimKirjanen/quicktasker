import { ExtendedUser } from "../../../types/user";

type Props = {
  userData: ExtendedUser;
};
function UserDataSection({ userData }: Props) {
  return <div>{JSON.stringify(userData)}</div>;
}

export { UserDataSection };
