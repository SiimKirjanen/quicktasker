import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  ADD_CUSTOM_FIELD,
  SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
} from "../../../constants";
import { useCustomFieldActions } from "../../../hooks/actions/useCustomFieldActions";
import { AppContext } from "../../../providers/AppContextProvider";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { CustomFieldType } from "../../../types/custom-field";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTInput } from "../../common/Input/Input";
import { Option, WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { PremiumAd } from "../../PremiudAd/PremiumAd";

type Props = {
  description: string;
};
function CustomFieldCreation({ description }: Props) {
  const [customFieldName, setCustomFieldName] = useState("");
  const [customFieldDescription, setCustomFieldDescription] = useState("");
  const [selectedCustomFieldType, setSelectedCustomFieldType] =
    useState<CustomFieldType>(CustomFieldType.Text);
  const { addCustomField } = useCustomFieldActions();
  const {
    state: { entityId, entityType, customFields, loading: customFieldsLoading },
    customFieldsDispatch,
  } = useContext(CustomFieldsContext);
  const {
    state: { is_customFields },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { modalDispatch } = useContext(ModalContext);

  const customFieldTypeOptions: Option[] = [
    { value: CustomFieldType.Text, label: "Text" },
    { value: CustomFieldType.Checkbox, label: "Checkbox" },
  ];
  const isCreationLimited = customFields.length >= 1 && !is_customFields;

  const createCustomField = async () => {
    if (!entityId || !entityType) {
      console.error("Entity ID or Entity Type is missing");
      return;
    }
    setLoading(true);
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
        modalDispatch({
          type: SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
          payload: false,
        });
      },
    );
    setLoading(false);
  };

  const resetState = () => {
    setCustomFieldName("");
    setCustomFieldDescription("");
    setSelectedCustomFieldType(CustomFieldType.Text);
  };

  if (customFieldsLoading) {
    return null;
  }

  if (isCreationLimited) {
    return (
      <PremiumAd
        description={__(
          "Upgrade to premium to add more custom fields.",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <div className="wpqt-mb-6 wpqt-flex wpqt-flex-col wpqt-items-center">
      <h2>{__("Custom Fields", "quicktasker")}</h2>
      <div className="wpqt-mb-4 wpqt-text-center">
        {description}
        {!is_customFields && (
          <span className="wpqt-font-semibold">
            {" "}
            {__(
              "Free version allows only one custom field. To add more, please upgrade to premium.",
              "quicktasker",
            )}
          </span>
        )}
      </div>

      <div className="wpqt-flex wpqt-gap-4">
        <div>
          <div className="wpqt-mb-2">{__("Name", "quicktasker")}</div>
          <WPQTInput value={customFieldName} onChange={setCustomFieldName} />
        </div>
        <div>
          <div className="wpqt-mb-2">{__("Description", "quicktasker")}</div>
          <WPQTTextarea
            value={customFieldDescription}
            onChange={setCustomFieldDescription}
          />
        </div>
        <div>
          <div className="wpqt-mb-2">{__("Type", "quicktasker")}</div>
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

      <div className="wpqt-flex wpqt-justify-end wpqt-gap-3">
        <WPQTIconButton
          text={__("Add", "quicktasker")}
          onClick={createCustomField}
          loading={loading}
          icon={<PlusCircleIcon className="wpqt-icon-green wpqt-size-5" />}
        />
      </div>
    </div>
  );
}

export { CustomFieldCreation };
