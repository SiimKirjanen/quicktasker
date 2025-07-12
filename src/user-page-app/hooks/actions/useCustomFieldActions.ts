import { CustomFieldEntityType } from "../../../types/custom-field";
import { updateCustomFieldValueRequest } from "../../api/user-page-api";
import { useErrorHandler } from "../useErrorHandler";

function useCustomFieldActions() {
  const { handleError } = useErrorHandler();

  const updateCustomFieldValue = async (
    entityId: string,
    entityType:
      | CustomFieldEntityType.Task
      | CustomFieldEntityType.QUICKTASKER
      | CustomFieldEntityType.WP_USER,
    customFieldId: string,
    value: string,
    callback?: () => void,
  ) => {
    try {
      await updateCustomFieldValueRequest(
        entityId,
        entityType,
        customFieldId,
        value,
      );
      if (callback) callback();
    } catch (error) {
      handleError(error);
    }
  };

  return { updateCustomFieldValue };
}

export { useCustomFieldActions };
