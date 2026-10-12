import { __ } from "@wordpress/i18n";
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
  is_banned: user.is_banned === "1",
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
  is_banned: user.is_banned === "1",
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

/**
 * Whether a WordPress user or a QuickTasker user can access a board.
 * WordPress administrators can access every board, other users only the
 * boards they have been added to.
 */
const canUserAccessPipeline = (user: User | WPUser, pipelineId: string) =>
  (user.user_type === UserTypes.WP_USER &&
    Boolean(user.can_access_all_pipelines)) ||
  (user.pipeline_ids ?? []).includes(Number(pipelineId));

/**
 * The name of the WordPress user who created something, like an API token or a
 * webhook. Null when it was created before the creator was saved.
 */
const getCreatorName = (
  createdBy: string | null,
  createdByName: string | null,
) => {
  if (!createdBy) {
    return null;
  }

  return createdByName ?? __("Deleted user", "quicktasker");
};

const userTypeStrings = {
  [UserTypes.QUICKTASKER]: "Quicktasker",
  [UserTypes.WP_USER]: "WordPress User",
};

export {
  canUserAccessPipeline,
  convertExtendedUserFromServer,
  convertUserFromServer,
  convertUserPageUserFromServer,
  getCreatorName,
  mapActionTargetTypeToUserType,
  userTypeStrings,
};
