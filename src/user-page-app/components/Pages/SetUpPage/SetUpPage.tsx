import { useContext, useEffect, useState } from "@wordpress/element";
import { setUpUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { PageScreenMiddle } from "../Page/Page";
import { WPQTFieldSet } from "../../../../components/common/Form/FieldSet";
import { WPQTField } from "../../../../components/common/Form/Field";
import { WPQTLabel } from "../../../../components/common/Form/Label";
import { WPQTButton } from "../../../../components/common/Button/Button";
import { WPQTInput } from "../../../../components/common/Input/Input";

function SetUpPage() {
  const {
    state: { pageHash, userName },
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (password !== passwordRepeat) {
      setValidationError("Passwords do not match");
    } else {
      setValidationError("");
    }
  }, [password, passwordRepeat]);

  const submitSetup = async () => {
    if (validationError) {
      return;
    }
    const data = { password };

    try {
      await setUpUserPageRequest(pageHash, data);
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <PageScreenMiddle>
      <h2>Set Up Page</h2>
      <p>Hello {userName}. Please complete setup</p>
      <form>
        <WPQTFieldSet>
          <WPQTField>
            <WPQTLabel>Enter your password</WPQTLabel>
            <WPQTInput value={password} onChange={setPassword} />
          </WPQTField>
          <WPQTField>
            <WPQTLabel>Repeat your password</WPQTLabel>
            <WPQTInput value={passwordRepeat} onChange={setPasswordRepeat} />
          </WPQTField>
          {validationError && (
            <div className="wpqt-text-qtTextRed">{validationError}</div>
          )}
          <WPQTField>
            <WPQTButton btnText="Setup" onClick={submitSetup} />
          </WPQTField>
        </WPQTFieldSet>
      </form>
    </PageScreenMiddle>
  );
}

export { SetUpPage };
