import { User, UserTypes, WPUser } from "../types/user";

function isUser(user: User | WPUser): user is User {
  return !user.user_type || user.user_type === UserTypes.QUICKTASKER;
}

function isWPUser(user: User | WPUser): user is WPUser {
  return user.user_type === UserTypes.WP_USER;
}

function isUserOrWPUser(user: User | WPUser): user is User | WPUser {
  return (
    user &&
    typeof user === "object" &&
    (!user.user_type ||
      user.user_type === UserTypes.QUICKTASKER ||
      user.user_type === UserTypes.WP_USER)
  );
}

export { isUser, isUserOrWPUser, isWPUser };
