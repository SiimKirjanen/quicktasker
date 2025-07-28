import { useContext, useState } from "@wordpress/element";
import { DELETE_CUSTOM_FIELD } from "../../../../../constants";
import { useCustomFieldActions } from "../../../../../hooks/actions/useCustomFieldActions";
import { CustomFieldsContext } from "../../../../../providers/CustomFieldsContextProvider";
import {
  CustomField,
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { CustomFieldActions } from "../CustomFieldActions/CustomFieldActions";
import { CheckboxCustomField } from "./CheckboxCustomField";
import { TextCustomField } from "./TextCustomField";

type Props = {
  data: CustomField;
};

function CustomField({ data }: Props) {
  const {
    state: { entityType, entityId },
    customFieldsDispatch,
  } = useContext(CustomFieldsContext);
  const {
    updateCustomFieldValue,
    markCustomFieldAsDeleted,
    updateCustomFieldDefaultValue,
  } = useCustomFieldActions();
  const [actionLoading, setActionLoading] = useState(false);

  const allowCustomFieldValueUpdate =
    entityType === CustomFieldEntityType.QUICKTASKER ||
    entityType === CustomFieldEntityType.Task;
  const allowCustomFieldDefaultValueUpdate =
    entityType === CustomFieldEntityType.Pipeline;

  const handleSave = async (newValue: string) => {
    if (allowCustomFieldValueUpdate) {
      setActionLoading(true);
      await updateCustomFieldValue(data.id, newValue, entityId, entityType);
      setActionLoading(false);
    } else if (allowCustomFieldDefaultValueUpdate) {
      setActionLoading(true);
      await updateCustomFieldDefaultValue(data.id, newValue);
      setActionLoading(false);
    } else {
      console.error("Invalid entity type for saving custom field value");
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    await markCustomFieldAsDeleted(data.id, () => {
      customFieldsDispatch({ type: DELETE_CUSTOM_FIELD, payload: data.id });
    });
    setActionLoading(false);
  };

  let customFieldElement;
  const initialValue = data.value ?? data.default_value ?? "";

  switch (data.type) {
    case CustomFieldType.Text: {
      customFieldElement = (
        <TextCustomField
          data={data}
          initialValue={initialValue}
          onChange={handleSave}
          disabled={actionLoading || !allowCustomFieldValueUpdate}
        />
      );
      break;
    }
    case CustomFieldType.Checkbox: {
      customFieldElement = (
        <CheckboxCustomField
          data={data}
          initialValue={initialValue}
          onChange={handleSave}
          disabled={actionLoading || !allowCustomFieldValueUpdate}
        />
      );
      break;
    }
  }

  return (
    <>
      <div></div>
      {customFieldElement}
      <CustomFieldActions
        data={data}
        locationOfCustomFields={entityType}
        onDelete={handleDelete}
        actionLoading={actionLoading}
      />
    </>
  );
}

export { CustomField };
