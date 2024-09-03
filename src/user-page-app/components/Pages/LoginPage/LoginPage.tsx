import { useContext } from "@wordpress/element";
import { logInUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useSession } from "../../../hooks/useSession";
import { SET_USER_LOGGED_IN } from "../../../constants";

function LoginPage() {
  const {
    state: { pageHash },
    userPageAppDispatch,
  } = useContext(UserPageAppContext);
  const { setSessionCookie } = useSession();

  const login = async () => {
    try {
      const response = await logInUserPageRequest(pageHash, "siim");
      await setSessionCookie(response.data);
      userPageAppDispatch({ type: SET_USER_LOGGED_IN, payload: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}

export { LoginPage };
