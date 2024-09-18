import { ServerUserSession, UserSession } from "../types/user-session";

const convertUserSessionFromServer = (
  user: ServerUserSession,
): UserSession => ({
  ...user,
});

export { convertUserSessionFromServer };
