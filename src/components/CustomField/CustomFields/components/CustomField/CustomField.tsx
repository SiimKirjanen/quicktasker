import { useContext, useEffect, useState } from "@wordpress/element";
import {
  CustomField,
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { WPQTInput } from "../../../../common/Input/Input";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { WPQTIconButton } from "../../../../common/Button/Button";
import { CustomFieldsContext } from "../../../../../providers/CustomFieldsContextProvider";
import { useCustomFieldActions } from "../../../../../hooks/actions/useCustomFieldActions";
import { DELETE_CUSTOM_FIELD } from "../../../../../constants";

type Props = {
  data: CustomField;
};

function CustomField({ data }: Props) {
  const [value, setValue] = useState("");
  const {
    state: { locationOfCustomFields, entityId },
    customFieldsDispatch,
  } = useContext(CustomFieldsContext);
  const { updateCustomFieldValue, markCustomFieldAsDeleted } =
    useCustomFieldActions();

  useEffect(() => {
    if (data.value) {
      setValue(data.value);
    }
  }, [data.value]);

  const handleSave = async () => {
    if (
      locationOfCustomFields === CustomFieldEntityType.User ||
      locationOfCustomFields === CustomFieldEntityType.Task
    ) {
      await updateCustomFieldValue(
        data.id,
        value,
        entityId,
        locationOfCustomFields,
      );
    } else {
      console.error("Invalid entity type for saving custom field value");
    }
  };

  const handleDelete = async () => {
    await markCustomFieldAsDeleted(data.id, () => {
      customFieldsDispatch({ type: DELETE_CUSTOM_FIELD, payload: data.id });
    });
  };

  let customFieldElement;

  switch (data.type) {
    case CustomFieldType.Text: {
      customFieldElement = (
        <TextCustomField data={data} value={value} onChange={setValue} />
      );
      break;
    }
    case CustomFieldType.Checkbox: {
      customFieldElement = (
        <CheckboxCustomField data={data} value={value} onChange={setValue} />
      );
      break;
    }
  }

  return (
    <>
      {customFieldElement}
      <CustomFieldActions
        data={data}
        locationOfCustomFields={locationOfCustomFields}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}

type CustomFieldActionsProps = {
  data: CustomField;
  locationOfCustomFields: CustomFieldEntityType | null;
  onSave: () => void;
  onDelete: () => void;
};
function CustomFieldActions({
  data,
  onSave,
  locationOfCustomFields,
  onDelete,
}: CustomFieldActionsProps) {
  const isAllowedToDelete = data.entity_type === locationOfCustomFields;
  const isAllowedToSave =
    locationOfCustomFields === CustomFieldEntityType.Task ||
    locationOfCustomFields === CustomFieldEntityType.User;
  const entityTypeDisplay =
    data.entity_type === CustomFieldEntityType.Pipeline
      ? "board"
      : data.entity_type;

  const handleDelete = async () => {
    if (!isAllowedToDelete) {
      return;
    }
    onDelete();
  };

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-justify-center wpqt-gap-2">
      {isAllowedToSave && (
        <WPQTIconButton
          onClick={onSave}
          icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
          tooltipId={`custom-field-${data.id}-update`}
          tooltipText="Edit custom field value"
        />
      )}
      <WPQTIconButton
        onClick={handleDelete}
        className={`${!isAllowedToDelete ? "!wpqt-cursor-not-allowed" : ""}`}
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        {...(!isAllowedToDelete && {
          tooltipId: `custom-field-${data.id}-delete`,
          tooltipText: `This custom field is inherited from ${entityTypeDisplay} settings and cant be deleted here`,
        })}
      />
    </div>
  );
}

type TextCustomFieldProps = {
  value: string;
  onChange: (value: string) => void;
  data: CustomField;
};
function TextCustomField({ data, value, onChange }: TextCustomFieldProps) {
  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <WPQTInput value={value} onChange={onChange} />
    </div>
  );
}

type CheckboxCustomFieldProps = {
  value: string;
  onChange: (value: string) => void;
  data: CustomField;
};
function CheckboxCustomField({
  data,
  value,
  onChange,
}: CheckboxCustomFieldProps) {
  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <input
        type="checkbox"
        checked={value === "true"}
        className="!wpqt-mb-3 !wpqt-block"
        onChange={(e) => onChange(e.target.checked ? "true" : "false")}
      />
    </div>
  );
}

type CustomFieldTitleProps = {
  name: string;
  description: string | null;
};
function CustomFieldTitle({ name, description = "" }: CustomFieldTitleProps) {
  return (
    <>
      <div className="wpqt-mb-1 wpqt-text-base wpqt-font-semibold">{name}</div>
      {description && (
        <div className="wpqt-mb-2 wpqt-italic">{description}</div>
      )}
    </>
  );
}

export { CustomField };
