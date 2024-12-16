import { ActionTargetType } from "../types/automation";
import {
  ExtendedUser,
  ServerExtendedUser,
  ServerUser,
  User,
  UserTypes,
} from "../types/user";

const convertUserFromServer = (user: ServerUser): User => ({
  ...user,
  is_active: user.is_active === "1",
  has_password: user.has_password === "1",
});

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

export {
  convertExtendedUserFromServer,
  convertUserFromServer,
  mapActionTargetTypeToUserType,
};
