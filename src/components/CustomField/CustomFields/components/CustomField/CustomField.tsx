import { useContext, useState } from "@wordpress/element";
import {
  CustomField,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { WPQTInput } from "../../../../common/Input/Input";
import { TrashIcon } from "@heroicons/react/24/outline";
import { WPQTIconButton } from "../../../../common/Button/Button";
import { CustomFieldsContext } from "../../../../../providers/CustomFieldsContextProvider";
import { useCustomFieldActions } from "../../../../../hooks/actions/useCustomFieldActions";
import { DELETE_CUSTOM_FIELD } from "../../../../../constants";

type Props = {
  data: CustomField;
};

function CustomField({ data }: Props) {
  let customFieldElement;

  switch (data.type) {
    case CustomFieldType.Text: {
      customFieldElement = <TextCustomField data={data} />;
      break;
    }
    case CustomFieldType.Checkbox: {
      customFieldElement = <CheckboxCustomField data={data} />;
      break;
    }
  }

  return (
    <>
      {customFieldElement}
      <CustomFieldActions data={data} />
    </>
  );
}

type CustomFieldActionsProps = {
  data: CustomField;
};
function CustomFieldActions({ data }: CustomFieldActionsProps) {
  const {
    state: { locationOfCustomFields },
    customFieldsDispatch,
  } = useContext(CustomFieldsContext);
  const { markCustomFieldAsDeleted } = useCustomFieldActions();
  const isAllowedToDelete = data.entity_type === locationOfCustomFields;

  const onDelete = async () => {
    if (!isAllowedToDelete) {
      return;
    }

    await markCustomFieldAsDeleted(data.id, () => {
      customFieldsDispatch({ type: DELETE_CUSTOM_FIELD, payload: data.id });
    });
  };

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-justify-center">
      <WPQTIconButton
        onClick={onDelete}
        className={`${!isAllowedToDelete ? "!wpqt-cursor-not-allowed" : ""}`}
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        {...(!isAllowedToDelete && {
          tooltipId: `custom-field-${data.id}`,
          tooltipText: `This custom field is inherited from ${data.entity_type} settings and is not deletable here`,
        })}
      />
    </div>
  );
}

function TextCustomField({ data }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <WPQTInput value={value} onChange={setValue} />
    </div>
  );
}

function CheckboxCustomField({ data }: Props) {
  const [value, setValue] = useState(false);

  return (
    <div className="wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center">
      <CustomFieldTitle name={data.name} description={data.description} />
      <input
        type="checkbox"
        checked={value}
        className="!wpqt-mb-3 !wpqt-block"
        onChange={(e) => setValue(e.target.checked)}
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
