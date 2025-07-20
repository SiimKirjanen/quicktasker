import { UserTypes } from "../../types/user";

type BaseUserPageStatus = {
  userId: string;
  userName: string;
  isActiveUser: boolean;
  isQuicktaskerUser: boolean;
  isWordPressUser: boolean;
  userType: UserTypes;
};

type UserPageStatus = BaseUserPageStatus & {
  setupCompleted: boolean;
};

type ServerUserPageStatus = BaseUserPageStatus & {
  setupCompleted: boolean;
};

export type { ServerUserPageStatus, UserPageStatus };
