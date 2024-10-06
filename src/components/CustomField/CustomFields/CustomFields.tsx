import { useContext } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { CustomField } from "./components/CustomField/CustomField";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";

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

  return (
    <div className="wpqt-flex wpqt-flex-col">
      {customFields.map((customField) => (
        <CustomField key={customField.id} data={customField} />
      ))}
    </div>
  );
}

export { CustomFields };
