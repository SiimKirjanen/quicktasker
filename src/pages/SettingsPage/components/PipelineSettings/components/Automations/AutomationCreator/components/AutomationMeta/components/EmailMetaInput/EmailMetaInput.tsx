import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { z } from "zod";
import { Alert } from "../../../../../../../../../../../components/common/Alert/Alert";
import { WPQTButton } from "../../../../../../../../../../../components/common/Button/Button";
import { WPQTInput } from "../../../../../../../../../../../components/common/Input/Input";

type Props = {
  setAutomationMeta: (meta: string) => void;
};

const emailSchema = z.string().email({ message: "Invalid email address" });

function EmailMetaInput({ setAutomationMeta }: Props) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      setIsEmailValid(true);
    } catch (e) {
      setIsEmailValid(false);
    }
  };

  const handleSetEmail = () => {
    if (isEmailValid) {
      setAutomationMeta(email);
    }
  };

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-justify-center wpqt-items-center">
      <Alert type="info">
        {__(
          "Make sure your website is configured to send out emails",
          "quicktasker",
        )}
      </Alert>
      <div className="wpqt-flex wpqt-flex-col">
        <label htmlFor="automation-meta-email-input">
          {__("Email will be sent to", "quicktasker")}
        </label>
        <WPQTInput
          inputId="automation-meta-email-input"
          value={email}
          onChange={setEmail}
          wrapperClassName="!wpqt-mb-0"
        />
        {!isEmailValid && (
          <div className="wpqt-text-red-500">
            {__("Invalid email address", "quicktasker")}
          </div>
        )}
      </div>
      <WPQTButton
        btnText={__("Set email", "quicktasker")}
        onClick={handleSetEmail}
      />
    </div>
  );
}

export { EmailMetaInput };
