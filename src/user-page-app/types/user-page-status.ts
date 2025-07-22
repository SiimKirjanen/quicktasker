import { UserTypes } from "../../types/user";

type BaseUserPageStatus = {
  userId: string;
  userName: string;
  isQuicktaskerUser: boolean;
  isWordPressUser: boolean;
  userType: UserTypes;
  setupCompleted: boolean;
  profilePictureUrl: string | null;
};

type UserPageStatus = BaseUserPageStatus & {
  isActiveUser: boolean;
};

type ServerUserPageStatus = BaseUserPageStatus & {
  isActiveUser: string;
};

export type { ServerUserPageStatus, UserPageStatus };
