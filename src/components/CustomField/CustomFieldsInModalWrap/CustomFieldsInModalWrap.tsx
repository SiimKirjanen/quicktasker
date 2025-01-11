import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { AppContext } from "../../../providers/AppContextProvider";
import { CustomFieldsContextProvider } from "../../../providers/CustomFieldsContextProvider";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { PremiumAd } from "../../PremiudAd/PremiumAd";
import { CustomFieldCreation } from "../CustomFieldCreation/CustomFieldCreation";
import { CustomFields } from "../CustomFields/CustomFields";
import { CustomFieldsRecovery } from "../CustomFieldsRecovery/CustomFieldsRecovery";

const descriptions: { [key in CustomFieldEntityType]: string } = {
  [CustomFieldEntityType.User]: __(
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
  [CustomFieldEntityType.User]: __(
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
  [CustomFieldEntityType.User]: __("User custom fields", "quicktasker"),
  [CustomFieldEntityType.Users]: __(
    "Global users custom fields",
    "quicktasker",
  ),
  [CustomFieldEntityType.Pipeline]: __("Board custom fields", "quicktasker"),
  [CustomFieldEntityType.Task]: __("Task custom fields", "quicktasker"),
};

type Props = {
  entityId: string;
  entityType: CustomFieldEntityType;
  pipelineId?: string | null;
};
function CustomFieldsInModalWrap({ entityId, entityType }: Props) {
  const {
    state: { is_customFields },
  } = useContext(AppContext);

  const creationDescription = descriptions[entityType];
  const customFieldsTitle = titles[entityType];
  const customFieldsDescription = existingFieldsDescriptions[entityType];

  return (
    <>
      {is_customFields ? (
        <div>
          <CustomFieldsContextProvider
            entityId={entityId}
            entityType={entityType}
          >
            <h2 className="wpqt-text-center">{customFieldsTitle}</h2>
            <div className="wpqt-mb-4 wpqt-text-center">
              {customFieldsDescription}
            </div>
            <CustomFields />
            <CustomFieldCreation description={creationDescription} />
            <CustomFieldsRecovery />
          </CustomFieldsContextProvider>
        </div>
      ) : (
        <PremiumAd
          title={__("Custom fields", "quicktasker")}
          description={__(
            "Premium feature to create and manage custom data fields. Allows to add extra data to tasks and users.",
            "quicktasker",
          )}
        />
      )}
    </>
  );
}

export { CustomFieldsInModalWrap };
