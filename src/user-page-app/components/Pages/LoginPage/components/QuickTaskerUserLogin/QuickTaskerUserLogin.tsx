import { useContext, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { Loading } from "../../../../../../components/Loading/Loading";
import {
  ButtonType,
  WPQTButton,
} from "../../../../../../components/common/Button/Button";
import { WPQTField } from "../../../../../../components/common/Form/Field";
import { WPQTFieldSet } from "../../../../../../components/common/Form/FieldSet";
import {
  InputType,
  WPQTInput,
} from "../../../../../../components/common/Input/Input";
import { logInUserPageRequest } from "../../../../../api/user-page-api";
import { SET_USER_LOGGED_IN } from "../../../../../constants";
import { useErrorHandler } from "../../../../../hooks/useErrorHandler";
import { useSession } from "../../../../../hooks/useSession";
import { UserPageAppContext } from "../../../../../providers/UserPageAppContextProvider";
import { PageScreenMiddle, PageTitle } from "../../../Page/Page";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";

function QuickTaskerUserLogin() {
  const {
    state: { userName },
    userPageAppDispatch,
  } = useContext(UserPageAppContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSessionCookie } = useSession();
  const { handleError } = useErrorHandler();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      toast.error(__("Please enter a password", "quicktasker"));
      return;
    }
    try {
      setLoading(true);
      const response = await logInUserPageRequest(password);
      await setSessionCookie(response.data);
      userPageAppDispatch({ type: SET_USER_LOGGED_IN, payload: true });
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  return (
    <PageScreenMiddle>
      <PageTitle
        titleClassName="wpqt-font-normal"
        className="wpqt-mb-2"
        description={__("Please log in to continue", "quicktasker")}
      >
        {sprintf(__("Hello %s", "quicktasker"), userName)}
      </PageTitle>
      <form onSubmit={login}>
        <WPQTFieldSet>
          <WPQTField>
            <WPQTInput
              value={password}
              onChange={setPassword}
              type={InputType.PASSWORD}
            />
          </WPQTField>
          <WPQTField className="wpqt-flex wpqt-justify-center">
            {loading ? (
              <Loading ovalSize="32" />
            ) : (
              <WPQTButton
                btnText={__("Login", "quicktasker")}
                type={ButtonType.SUBMIT}
              />
            )}
          </WPQTField>
        </WPQTFieldSet>
      </form>
      <ForgotPassword />
    </PageScreenMiddle>
  );
}

export { QuickTaskerUserLogin };
