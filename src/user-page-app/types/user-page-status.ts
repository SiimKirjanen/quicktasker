type BaseUserPageStatus = {
  isLoggedIn: boolean;
  userId: string;
  userName: string;
  isActiveUser: boolean;
  isQuicktaskerUser: boolean;
  isWordPressUser: boolean;
};

type UserPageStatus = BaseUserPageStatus & {
  setupCompleted: boolean;
};

type ServerUserPageStatus = BaseUserPageStatus & {
  setupCompleted: boolean;
};

export type { ServerUserPageStatus, UserPageStatus };
