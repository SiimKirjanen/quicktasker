import { User, UserTypes, WPUser } from "../types/user";

function isUser(user: User | WPUser): user is User {
  return !user.user_type || user.user_type === UserTypes.QUICKTASKER;
}

function isWPUser(user: User | WPUser): user is WPUser {
  return user.user_type === UserTypes.WORDPRESS;
}

export { isUser, isWPUser };
