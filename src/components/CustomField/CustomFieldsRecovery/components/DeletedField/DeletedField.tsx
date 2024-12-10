import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TbRestore } from "react-icons/tb";
import { ADD_CUSTOM_FIELD } from "../../../../../constants";
import { useCustomFieldActions } from "../../../../../hooks/actions/useCustomFieldActions";
import { CustomFieldsContext } from "../../../../../providers/CustomFieldsContextProvider";
import { CustomField } from "../../../../../types/custom-field";
import { WPQTIconButton } from "../../../../common/Button/Button";

type Props = {
  customField: CustomField;
  refreshDeletedFields: () => Promise<void>;
};
function DeletedField({ customField, refreshDeletedFields }: Props) {
  const { customFieldsDispatch } = useContext(CustomFieldsContext);
  const [restoring, setRestoring] = useState(false);
  const { restoreCustomField } = useCustomFieldActions();

  const restoreField = async () => {
    setRestoring(true);
    await restoreCustomField(customField.id, (restoredField) => {
      customFieldsDispatch({
        type: ADD_CUSTOM_FIELD,
        payload: restoredField,
      });
      refreshDeletedFields();
    });
    setRestoring(false);
  };
  return (
    <div className="wpqt-flex wpqt-gap-2 wpqt-items-center">
      <div>
        <span className="wpqt-font-semibold">{__("Name:", "quicktasker")}</span>{" "}
        {customField.name}
      </div>
      <div>
        <span className="wpqt-font-semibold">
          {__("Description:", "quicktasker")}
        </span>{" "}
        {customField.description}
      </div>
      <div>
        <span className="wpqt-font-semibold">{__("Type:", "quicktasker")}</span>{" "}
        {customField.type}
      </div>
      <div>
        <WPQTIconButton
          onClick={restoreField}
          loading={restoring}
          icon={<TbRestore className="wpqt-icon-green wpqt-size-5" />}
          tooltipId={`restore-field-${customField.id}`}
          tooltipText={__("Restore custom field", "quicktasker")}
        />
      </div>
    </div>
  );
}

export { DeletedField };
