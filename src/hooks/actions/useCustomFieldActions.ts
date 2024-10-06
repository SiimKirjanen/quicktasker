import { toast } from "react-toastify";
import { addCustomFieldRequest } from "../../api/api";
import {
  CustomField,
  CustomFieldEntityType,
  CustomFieldType,
} from "../../types/custom-field";

function useCustomFieldActions() {
  const addCustomField = async (
    entityId: string,
    entityType: CustomFieldEntityType,
    type: CustomFieldType,
    name: string,
    description: string,
    callback?: (customField: CustomField) => void,
  ) => {
    try {
      const response = await addCustomFieldRequest(
        entityId,
        entityType,
        type,
        name,
        description,
      );
      if (callback) callback(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add a custom field");
    }
  };

  return {
    addCustomField,
  };
}

export { useCustomFieldActions };
