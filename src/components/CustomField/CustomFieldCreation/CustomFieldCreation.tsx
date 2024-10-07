import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../types/custom-field";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTInput } from "../../common/Input/Input";
import { useContext, useState } from "@wordpress/element";
import { WPQTSelect, Option } from "../../common/Select/WPQTSelect";
import { useCustomFieldActions } from "../../../hooks/actions/useCustomFieldActions";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";
import { ADD_CUSTOM_FIELD } from "../../../constants";

type Props = {
  entityId: string;
  entityType: CustomFieldEntityType;
  description: string;
};
function CustomFieldCreation({ entityId, entityType, description }: Props) {
  const [customFieldName, setCustomFieldName] = useState("");
  const [customFieldDescription, setCustomFieldDescription] = useState("");
  const [isCreationOpen, setIsCreationOpen] = useState(false);
  const [selectedCustomFieldType, setSelectedCustomFieldType] =
    useState<CustomFieldType>(CustomFieldType.Text);
  const { addCustomField } = useCustomFieldActions();
  const { customFieldsDispatch } = useContext(CustomFieldsContext);

  const customFieldTypeOptions: Option[] = [
    { value: CustomFieldType.Text, label: "Text" },
    { value: CustomFieldType.Checkbox, label: "Checkbox" },
  ];

  const createCustomField = async () => {
    await addCustomField(
      entityId,
      entityType,
      selectedCustomFieldType,
      customFieldName,
      customFieldDescription,
      (newCustomField) => {
        customFieldsDispatch({
          type: ADD_CUSTOM_FIELD,
          payload: newCustomField,
        });
        resetState();
      },
    );
  };

  const resetState = () => {
    setCustomFieldName("");
    setCustomFieldDescription("");
    setSelectedCustomFieldType(CustomFieldType.Text);
    setIsCreationOpen(false);
  };
  return (
    <div className="wpqt-mb-6 wpqt-flex wpqt-flex-col wpqt-items-center">
      <h2>Custom Fields</h2>
      <div className="wpqt-mb-4 wpqt-text-center">{description}</div>

      {isCreationOpen && (
        <div className="wpqt-flex wpqt-gap-4">
          <div>
            <div className="wpqt-mb-2">Name</div>
            <WPQTInput value={customFieldName} onChange={setCustomFieldName} />
          </div>
          <div>
            <div className="wpqt-mb-2">Description</div>
            <WPQTTextarea
              value={customFieldDescription}
              onChange={setCustomFieldDescription}
            />
          </div>
          <div>
            <div className="wpqt-mb-2">Type</div>
            <WPQTSelect
              selectedOptionValue={selectedCustomFieldType}
              options={customFieldTypeOptions}
              onSelectionChange={(selection: string) => {
                setSelectedCustomFieldType(selection as CustomFieldType);
              }}
              allSelector={false}
            />
          </div>
        </div>
      )}

      <div className="wpqt-flex wpqt-justify-end wpqt-gap-3">
        <WPQTIconButton
          text={isCreationOpen ? "Cancel" : "Add new custom field"}
          onClick={() => setIsCreationOpen(!isCreationOpen)}
          icon={
            isCreationOpen ? (
              <XCircleIcon className="wpqt-icon-red wpqt-size-5" />
            ) : (
              <PlusCircleIcon className="wpqt-icon-green wpqt-size-5" />
            )
          }
        />
        {isCreationOpen && (
          <WPQTIconButton
            text="Add"
            onClick={createCustomField}
            icon={<PlusCircleIcon className="wpqt-icon-green wpqt-size-5" />}
          />
        )}
      </div>
    </div>
  );
}

export { CustomFieldCreation };
