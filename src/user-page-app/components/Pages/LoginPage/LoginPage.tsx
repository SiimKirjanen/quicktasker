import { useContext, useState } from "@wordpress/element";
import { logInUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useSession } from "../../../hooks/useSession";
import { SET_USER_LOGGED_IN } from "../../../constants";
import { WPQTFieldSet } from "../../../../components/common/Form/FieldSet";
import { WPQTField } from "../../../../components/common/Form/Field";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { WPQTButton } from "../../../../components/common/Button/Button";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { PageScreenMiddle } from "../Page/Page";
import { toast } from "react-toastify";
import { __, sprintf } from "@wordpress/i18n";

function LoginPage() {
  const {
    state: { pageHash, userName },
    userPageAppDispatch,
  } = useContext(UserPageAppContext);
  const { setSessionCookie } = useSession();
  const [password, setPassword] = useState("");
  const { handleError } = useErrorHandler();

  const login = async () => {
    if (!password) {
      toast.error(__("Please enter a password", "quicktasker"));
      return;
    }
    try {
      const response = await logInUserPageRequest(pageHash, password);
      await setSessionCookie(response.data);
      userPageAppDispatch({ type: SET_USER_LOGGED_IN, payload: true });
    } catch (error: unknown) {
      handleError(error);
    }
  };
  return (
    <PageScreenMiddle>
      <h2>{sprintf(__("Hello %s", "quicktasker"), userName)}</h2>
      <p>{__("Please log in to continue", "quicktasker")}</p>
      <form>
        <WPQTFieldSet>
          <WPQTField>
            <WPQTInput value={password} onChange={setPassword} />
          </WPQTField>
          <WPQTField className="wpqt-flex wpqt-justify-center">
            <WPQTButton btnText={__("Login", "quicktasker")} onClick={login} />
          </WPQTField>
        </WPQTFieldSet>
      </form>
    </PageScreenMiddle>
  );
}

export { LoginPage };
