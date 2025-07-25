import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getCustomFieldsRequest } from "../../../api/api";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";
import { CustomField } from "../../../types/custom-field";
import { Loading } from "../../Loading/Loading";
import { DeletedField } from "./components/DeletedField/DeletedField";

function CustomFieldsRecovery() {
  const [loadingFields, setLoadingFields] = useState(true);
  const [deletedCustomFields, setDeletedCustomFields] = useState<
    CustomField[] | null
  >(null);
  const {
    state: { entityId, entityType },
  } = useContext(CustomFieldsContext);

  useEffect(() => {
    loadDeletedFields();
  }, []);

  const loadDeletedFields = async () => {
    if (!entityId || !entityType) {
      console.error("Entity ID or Entity Type is missing");
      return;
    }
    try {
      setLoadingFields(true);
      const response = await getCustomFieldsRequest(
        entityId,
        entityType,
        false,
      );
      setDeletedCustomFields(response.data);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load deleted custom fields", "quicktasker"));
    } finally {
      setLoadingFields(false);
    }
  };

  const renderContent = () => {
    if (loadingFields) {
      return <Loading ovalSize="36" />;
    }

    if (deletedCustomFields && deletedCustomFields.length === 0) {
      return (
        <div className="wpqt-text-center wpqt-font-semibold">
          {__("No deleted custom fields", "quicktasker")}
        </div>
      );
    }

    if (deletedCustomFields && deletedCustomFields.length > 0) {
      return (
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-3">
          {deletedCustomFields.map((field) => (
            <DeletedField
              key={field.id}
              customField={field}
              refreshDeletedFields={loadDeletedFields}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="wpqt-my-3 wpqt-flex wpqt-flex-col wpqt-items-center">
      <h2>{__("Custom Field recovery", "quicktasker")}</h2>
      <div className="wpqt-mb-4 wpqt-text-center">
        {__(
          "Deleted custom field by accident? No worries! You can recover it here.",
          "quicktasker",
        )}
      </div>
      <div className="wpqt-mb-3">{renderContent()}</div>
    </div>
  );
}

export { CustomFieldsRecovery };
