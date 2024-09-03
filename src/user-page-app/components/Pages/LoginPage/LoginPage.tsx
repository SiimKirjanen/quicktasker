import { useContext } from "@wordpress/element";
import { logInUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useSession } from "../../../hooks/useSession";

function LoginPage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { setSessionCookie } = useSession();

  const login = async () => {
    try {
      const response = await logInUserPageRequest(pageHash, "siim");

      setSessionCookie(response.data);
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
