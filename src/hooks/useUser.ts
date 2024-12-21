import { useContext, useMemo } from "@wordpress/element";
import { UserContext } from "../providers/UserContextProvider";
import { UserTypes } from "../types/user";

const useUser = () => {
  const {
    state: { users, wpUsers },
  } = useContext(UserContext);

  const getUser = (userId: string, userType: UserTypes) => {
    if (userType === UserTypes.QUICKTASKER) {
      return users.find((u) => u.id === userId);
    }
    if (userType === UserTypes.WP_USER) {
      return wpUsers.find((u) => u.id === userId);
    }
  };

  const combinedUsers = useMemo(() => [...users, ...wpUsers], [users, wpUsers]);

  return { getUser, combinedUsers };
};

export { useUser };
