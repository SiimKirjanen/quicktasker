import { useContext, useState } from "@wordpress/element";
import { logInUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useSession } from "../../../hooks/useSession";
import { SET_USER_LOGGED_IN } from "../../../constants";
import { WPQTFieldSet } from "../../../../components/common/Form/FieldSet";
import { WPQTLegend } from "../../../../components/common/Form/Legend";
import { WPQTField } from "../../../../components/common/Form/Field";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { WPQTLabel } from "../../../../components/common/Form/Label";
import { WPQTButton } from "../../../../components/common/Button/Button";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

function LoginPage() {
  const {
    state: { pageHash, userName },
    userPageAppDispatch,
  } = useContext(UserPageAppContext);
  const { setSessionCookie } = useSession();
  const [password, setPassword] = useState("");
  const { handleError } = useErrorHandler();

  const login = async () => {
    try {
      const response = await logInUserPageRequest(pageHash, password);
      await setSessionCookie(response.data);
      userPageAppDispatch({ type: SET_USER_LOGGED_IN, payload: true });
    } catch (error: any) {
      handleError(error);
    }
  };
  return (
    <div className="wpqt-flex wpqt-h-screen wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <h2>Hello {userName}</h2>
      <p>Plese log in to continue</p>
      <form>
        <WPQTFieldSet>
          <WPQTLegend>Log in</WPQTLegend>
          <WPQTField>
            <WPQTLabel>Enter password</WPQTLabel>
            <WPQTInput value={password} onChange={setPassword} />
          </WPQTField>
          <WPQTField>
            <WPQTButton btnText="Login" onClick={login} />
          </WPQTField>
        </WPQTFieldSet>
      </form>
    </div>
  );
}

export { LoginPage };
