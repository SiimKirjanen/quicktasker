import { __ } from "@wordpress/i18n";
import { CustomFieldsContextProvider } from "../../../providers/CustomFieldsContextProvider";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { CustomFieldCreatorModal } from "../../Modal/CustomFieldCreatorModal/CustomFieldCreatorModal";
import { CustomFieldRecoveryModal } from "../../Modal/CustomFieldRecoveryModal/CustomFieldRecoveryModal";
import { CustomFields } from "../CustomFields/CustomFields";
import { CustomFieldActins } from "../CustomFieldsActions/CustomFieldActions";

const descriptions: { [key in CustomFieldEntityType]: string } = {
  [CustomFieldEntityType.QUICKTASKER]: __(
    "Add user-specific custom fields. If you want to add custom fields to all users, please go to users settings.",
    "quicktasker",
  ),
  [CustomFieldEntityType.WP_USER]: __(
    "Add user-specific custom fields. If you want to add custom fields to all users, please go to users settings.",
    "quicktasker",
  ),
  [CustomFieldEntityType.Users]: __(
    "Add custom fields to all users. If you want to add custom fields to a specific user only, please go to that user settings.",
    "quicktasker",
  ),
  [CustomFieldEntityType.Pipeline]: __(
    "Add board level custom fields.",
    "quicktasker",
  ),
  [CustomFieldEntityType.Task]: __(
    "Add task-specific custom fields. If you want to add custom fields to all tasks in this board, please go to board settings.",
    "quicktasker",
  ),
};

const existingFieldsDescriptions: { [key in CustomFieldEntityType]: string } = {
  [CustomFieldEntityType.QUICKTASKER]: __(
    "Custom fields applied to this user, including both user-specific and global users fields.",
    "quicktasker",
  ),
  [CustomFieldEntityType.WP_USER]: __(
    "Custom fields applied to this user, including both user-specific and global users fields.",
    "quicktasker",
  ),
  [CustomFieldEntityType.Users]: __(
    "Global user custom field are applied to all users.",
    "quicktasker",
  ),
  [CustomFieldEntityType.Pipeline]: __(
    "Board level fields are applied to all tasks in this board.",
    "quicktasker",
  ),
  [CustomFieldEntityType.Task]: __(
    "Custom fields applied to this task, including both task-specific and board-level fields.",
    "quicktasker",
  ),
};

const titles: { [key in CustomFieldEntityType]: string } = {
  [CustomFieldEntityType.QUICKTASKER]: __("User custom fields", "quicktasker"),
  [CustomFieldEntityType.WP_USER]: __("User custom fields", "quicktasker"),
  [CustomFieldEntityType.Users]: __(
    "Global users custom fields",
    "quicktasker",
  ),
  [CustomFieldEntityType.Pipeline]: __("Board custom fields", "quicktasker"),
  [CustomFieldEntityType.Task]: __("Custom fields", "quicktasker"),
};

type Props = {
  entityId: string;
  entityType: CustomFieldEntityType;
  pipelineId?: string | null;
};
function CustomFieldsInModalWrap({ entityId, entityType }: Props) {
  const creationDescription = descriptions[entityType];
  const customFieldsTitle = titles[entityType];
  const customFieldsDescription = existingFieldsDescriptions[entityType];

  return (
    <div className="wpqt-relative">
      <CustomFieldsContextProvider entityId={entityId} entityType={entityType}>
        <CustomFieldActins className="wpqt-absolute wpqt--top-2 wpqt-right-0" />
        <h2 className="wpqt-text-center">{customFieldsTitle}</h2>
        <div className="wpqt-mb-4 wpqt-text-center">
          {customFieldsDescription}
        </div>
        <CustomFields />
        <CustomFieldCreatorModal description={creationDescription} />
        <CustomFieldRecoveryModal />
      </CustomFieldsContextProvider>
    </div>
  );
}

export { CustomFieldsInModalWrap };
