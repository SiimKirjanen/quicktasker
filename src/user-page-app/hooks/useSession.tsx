import { useState } from "react";
import { UserSession } from "../types/user-session";
import Cookies from "js-cookie";

function useSession() {
  const [isLoggedId, setIsLoggedId] = useState(
    !!Cookies.get("wpqt-session-token"),
  );

  const setSessionCookie = (session: UserSession) => {
    const expireData = new Date(`${session.expiresAtUTC}Z`);

    Cookies.set("wpqt-session-token", session.sessionToken, {
      expires: expireData,
      path: "/",
    });

    setIsLoggedId(true);
  };

  const getSessionCookie = (): string | undefined => {
    return Cookies.get("wpqt-session-token");
  };

  return { setSessionCookie, getSessionCookie, isLoggedId };
}

export { useSession };
