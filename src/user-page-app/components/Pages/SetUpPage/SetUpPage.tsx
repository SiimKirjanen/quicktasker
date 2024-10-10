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
import { __, sprintf } from "@wordpress/i18n";

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
      setValidationError(__("Passwords do not match", "quicktasker"));
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
      <p>
        {sprintf(
          __("Hello %s. Please complete setup", "quicktasker"),
          userName,
        )}
      </p>
      <form>
        <WPQTFieldSet>
          <WPQTField>
            <WPQTLabel>{__("Enter your password", "quicktasker")}</WPQTLabel>
            <WPQTInput value={password} onChange={setPassword} />
          </WPQTField>
          <WPQTField>
            <WPQTLabel>{__("Repeat your password", "quicktasker")}</WPQTLabel>
            <WPQTInput value={passwordRepeat} onChange={setPasswordRepeat} />
          </WPQTField>
          {validationError && (
            <div className="wpqt-text-qtTextRed">{validationError}</div>
          )}
          <WPQTField>
            <WPQTButton
              btnText={__("Setup", "quicktasker")}
              onClick={submitSetup}
            />
          </WPQTField>
        </WPQTFieldSet>
      </form>
    </PageScreenMiddle>
  );
}

export { SetUpPage };
