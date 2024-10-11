import { UserSession } from "../types/user-session";
import Cookies from "js-cookie";
import { useContext } from "@wordpress/element";
import { UserPageAppContext } from "../providers/UserPageAppContextProvider";

function useSession() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);

  /**
   * Sets the session cookie and stores the session expiration in local storage.
   *
   * @param {UserSession} session - The user session object containing session details.
   * @returns {Promise<void>} A promise that resolves when the session cookie and expiration are set.
   */
  const setSessionCookie = async (session: UserSession) => {
    const expireDate = new Date(`${session.expiresAtUTC}Z`);

    localStorage.setItem(
      `wpqt-session-expiration-${pageHash}`,
      expireDate.toISOString(),
    );

    Cookies.set(`wpqt-session-token-${pageHash}`, session.sessionToken, {
      expires: expireDate,
      path: "/",
      sameSite: "strict",
    });
  };

  const getSessionCookieValue = (): string | undefined => {
    return Cookies.get(`wpqt-session-token-${pageHash}`);
  };

  const isLoggedIn = (): boolean => {
    return !!Cookies.get(`wpqt-session-token-${pageHash}`);
  };

  const deleteSessionCookie = async () => {
    Cookies.remove(`wpqt-session-token-${pageHash}`);
  };

  /**
   * Retrieves the remaining session time for a given page hash.
   *
   * @param {string} pageHash - The unique identifier for the user page.
   * @returns {number | null} - The time left in minutes, or null if no expiration is found.
   */
  const getSessionTimeLeft = (pageHash: string) => {
    const expirationString = localStorage.getItem(
      `wpqt-session-expiration-${pageHash}`,
    );
    if (!expirationString) {
      return null;
    }

    const expirationDate = new Date(expirationString);
    const timeLeft = expirationDate.getTime() - new Date().getTime();

    // Convert milliseconds to minutes
    return timeLeft > 0 ? Math.floor(timeLeft / 1000 / 60) : 0;
  };

  return {
    setSessionCookie,
    getSessionCookieValue,
    isLoggedIn,
    deleteSessionCookie,
    getSessionTimeLeft,
  };
}

export { useSession };
