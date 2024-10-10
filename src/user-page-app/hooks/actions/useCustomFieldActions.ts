import { useContext } from "@wordpress/element";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { updateCustomFieldValueRequest } from "../../api/user-page-api";
import { UserPageAppContext } from "../../providers/UserPageAppContextProvider";
import { useErrorHandler } from "../useErrorHandler";
import { toast } from "react-toastify";
import { __ } from "@wordpress/i18n";

function useCustomFieldActions() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();

  const updateCustomFieldValue = async (
    entityId: string,
    entityType: CustomFieldEntityType.Task | CustomFieldEntityType.User,
    customFieldId: string,
    value: string,
    callback?: () => void,
  ) => {
    try {
      await updateCustomFieldValueRequest(
        pageHash,
        entityId,
        entityType,
        customFieldId,
        value,
      );
      toast.success(__("Custom field value updated", "quicktasker"));
      if (callback) callback();
    } catch (error) {
      handleError(error);
    }
  };

  return { updateCustomFieldValue };
}

export { useCustomFieldActions };
