import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

function ForgotPassword() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div
      className="wpqt-flex wpqt-flex-col wpqt-gap3 wpqt-items-center wpqt-mt-2 wpqt-text-sm wpqt-cursor-pointer wpqt-relative wpqt-min-w-[300px] wpqt-text-blue-500"
      onClick={() => setGuideOpen(!guideOpen)}
    >
      <div className="wpqt-mb-2">
        {__("Forgot the password?", "quicktasker")}
      </div>

      <div
        className={`wpqt-text-center wpqt-absolute wpqt-top-full wpqt-left-0 wpqt-w-full ${
          guideOpen ? "wpqt-animate-fadeIn" : "wpqt-animate-fadeOut"
        } ${!guideOpen && "wpqt-hidden"}`}
      >
        {__(
          "Please contact the site admin to reset your password",
          "quicktasker",
        )}
      </div>
    </div>
  );
}

export { ForgotPassword };
