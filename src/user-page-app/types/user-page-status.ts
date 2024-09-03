type BaseUserPageStatus = {
  isLoggedIn: boolean;
};

type UserPageStatus = BaseUserPageStatus & {
  isActiveUser: boolean;
  setupCompleted: boolean;
};

type ServerUserPageStatus = BaseUserPageStatus & {
  isActiveUser: string;
  setupCompleted: boolean;
};

export type { UserPageStatus, ServerUserPageStatus };
