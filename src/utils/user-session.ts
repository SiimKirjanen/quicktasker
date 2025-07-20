import Cookies from "js-cookie";
import { ServerUserSession, UserSession } from "../types/user-session";
import { State } from "../user-page-app/providers/UserPageAppContextProvider";

const convertUserSessionFromServer = (
  user: ServerUserSession,
): UserSession => ({
  ...user,
  is_active: user.is_active === "1",
});

const calculateLoginStatus = (state: State): boolean => {
  if (state.isQuicktaskerUser && state.pageHash) {
    const hasToken = !!Cookies.get(`wpqt-session-token-${state.pageHash}`);

    return hasToken;
  }

  if (state.isWordPressUser && state.userId) {
    const hasUserId = !!state.userId;

    return hasUserId;
  }

  return false;
};

export { calculateLoginStatus, convertUserSessionFromServer };
