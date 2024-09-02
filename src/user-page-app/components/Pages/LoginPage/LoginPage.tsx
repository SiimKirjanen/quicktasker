import { useContext } from "@wordpress/element";
import { logInUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";

function LoginPage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);

  const login = async () => {
    try {
      await logInUserPageRequest(pageHash, "password");
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
