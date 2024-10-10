import { useContext } from "@wordpress/element";
import {
  CustomField,
  CustomFieldEntityType,
} from "../../../../types/custom-field";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { CustomField as CustomFieldComponent } from "../CustomField/CustomField";
import { useCustomFieldActions } from "../../../hooks/actions/useCustomFieldActions";

type Props = {
  entityId: string;
  entityType: CustomFieldEntityType.Task | CustomFieldEntityType.User;
  customFields: CustomField[];
};

function CustomFieldsWrap({ entityId, entityType, customFields }: Props) {
  const {
    state: { cf },
  } = useContext(UserPageAppContext);
  const { updateCustomFieldValue } = useCustomFieldActions();

  const saveCustomFieldValueChange = async (
    customFieldId: string,
    value: string,
  ) => {
    await updateCustomFieldValue(entityId, entityType, customFieldId, value);
  };

  if (!cf || !customFields) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
      {customFields.map((cf) => (
        <CustomFieldComponent
          key={cf.id}
          data={cf}
          saveCustomFieldValueChange={saveCustomFieldValueChange}
        ></CustomFieldComponent>
      ))}
    </div>
  );
}

export { CustomFieldsWrap };
