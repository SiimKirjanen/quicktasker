import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";
import { LoadingOval } from "../../Loading/Loading";
import { CustomField } from "./components/CustomField/CustomField";

function CustomFields() {
  const {
    state: { loading, customFields },
  } = useContext(CustomFieldsContext);

  if (loading) {
    return (
      <div className="wpqt-flex wpqt-justify-center">
        <LoadingOval width="36" height="36" />
      </div>
    );
  }

  if (customFields && customFields.length === 0) {
    return (
      <div className="wpqt-text-center wpqt-font-semibold">
        {__("No related custom fields created", "quicktasker")}
      </div>
    );
  }

  return (
    <div className="wpqt-my-4 wpqt-grid wpqt-grid-cols-[100px_1fr_100px] wpqt-items-center wpqt-gap-3">
      {customFields.map((customField) => (
        <CustomField key={customField.id} data={customField} />
      ))}
    </div>
  );
}

export { CustomFields };
