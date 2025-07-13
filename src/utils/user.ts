import { ActionTargetType } from "../types/automation";
import {
  ExtendedUser,
  ServerExtendedUser,
  ServerUser,
  User,
  UserTypes,
  WPUser,
} from "../types/user";

const convertUserFromServer = (user: ServerUser): User => ({
  ...user,
  is_active: user.is_active === "1",
  has_password: user.has_password === "1",
});

const convertUserPageUserFromServer = (user: ServerUser | WPUser) => {
  if (user.user_type === UserTypes.WP_USER) {
    return user;
  }

  return convertUserFromServer(user);
};

const convertExtendedUserFromServer = (
  user: ServerExtendedUser,
): ExtendedUser => ({
  ...user,
  is_active: user.is_active === "1",
});

const mapActionTargetTypeToUserType = (
  type: ActionTargetType,
): UserTypes | null => {
  switch (type) {
    case ActionTargetType.QUICKTASKER:
      return UserTypes.QUICKTASKER;
    case ActionTargetType.WP_USER:
      return UserTypes.WP_USER;
    default:
      return null;
  }
};

const userTypeStrings = {
  [UserTypes.QUICKTASKER]: "Quicktasker",
  [UserTypes.WP_USER]: "WordPress User",
};

export {
  convertExtendedUserFromServer,
  convertUserFromServer,
  convertUserPageUserFromServer,
  mapActionTargetTypeToUserType,
  userTypeStrings,
};
