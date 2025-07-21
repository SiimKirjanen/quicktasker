import { UserTypes } from "../../types/user";

type BaseUserPageStatus = {
  userId: string;
  userName: string;
  isQuicktaskerUser: boolean;
  isWordPressUser: boolean;
  userType: UserTypes;
  setupCompleted: boolean;
};

type UserPageStatus = BaseUserPageStatus & {
  isActiveUser: boolean;
};

type ServerUserPageStatus = BaseUserPageStatus & {
  isActiveUser: string;
};

export type { ServerUserPageStatus, UserPageStatus };
