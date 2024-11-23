import { __ } from "@wordpress/i18n";

function CustomFieldsAd() {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-h-full">
      <h2 className="wpqt-font-semibold">{__("Custom fields")}</h2>
      <div className="wpqt-text-center wpqt-mb-4">
        {__(
          "Premium feature to create and manage custom data fields. Allows to add extra data to tasks and users.",
        )}
      </div>
      <div className="wpqt-text-blue-500 wpqt-font-semibold">
        <a href="https://payhip.com/b/84TLC" target="_blank" rel="noreferrer">
          {__("Get the premium version", "quicktasker")}
        </a>
      </div>
    </div>
  );
}

export { CustomFieldsAd };
