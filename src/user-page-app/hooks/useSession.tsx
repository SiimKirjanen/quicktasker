import { UserSession } from "../types/user-session";
import Cookies from "js-cookie";
import { useContext } from "@wordpress/element";
import { UserPageAppContext } from "../providers/UserPageAppContextProvider";

function useSession() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const setSessionCookie = async (session: UserSession) => {
    const expireData = new Date(`${session.expiresAtUTC}Z`);

    Cookies.set(`wpqt-session-token-${pageHash}`, session.sessionToken, {
      expires: expireData,
      path: "/",
      sameSite: "strict",
    });
  };

  const getSessionCookie = (): string | undefined => {
    return Cookies.get(`wpqt-session-token-${pageHash}`);
  };

  const isLoggedIn = (): boolean => {
    return !!Cookies.get(`wpqt-session-token-${pageHash}`);
  };

  return { setSessionCookie, getSessionCookie, isLoggedIn };
}

export { useSession };
