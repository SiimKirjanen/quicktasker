import { useContext } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { CustomField } from "./components/CustomField/CustomField";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";

function CustomFields() {
  const {
    state: { loading, customFields },
  } = useContext(CustomFieldsContext);

  if (loading) {
    return <LoadingOval width="36" height="36" />;
  }

  return (
    <div className="wpqt-grid wpqt-grid-cols-2 wpqt-gap-2">
      {customFields.map((customField) => (
        <CustomField key={customField.id} data={customField} />
      ))}
    </div>
  );
}

export { CustomFields };
