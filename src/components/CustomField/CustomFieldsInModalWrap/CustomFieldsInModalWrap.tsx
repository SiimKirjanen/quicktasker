import { useContext } from "@wordpress/element";
import { CustomFieldsContextProvider } from "../../../providers/CustomFieldsContextProvider";
import { CustomFieldCreation } from "../CustomFieldCreation/CustomFieldCreation";
import { CustomFields } from "../CustomFields/CustomFields";
import { CustomFieldsAd } from "../CustomFieldsAd/CustomFieldsAd";
import { AppContext } from "../../../providers/AppContextProvider";
import { CustomFieldEntityType } from "../../../types/custom-field";

const descriptions: { [key in CustomFieldEntityType]: string } = {
  [CustomFieldEntityType.User]: "Add custom fields to this user only",
  [CustomFieldEntityType.Users]:
    "Add custom fields to all users. If you want to add custom fields to a specific user, please go to that user settings",
  [CustomFieldEntityType.Pipeline]:
    "Add custom fields to all tasks in this board",
  [CustomFieldEntityType.Task]:
    "Add custom fields to this task only. If you want to add custom fields to all tasks in this board, please go to that board settings",
};

const titles: { [key in CustomFieldEntityType]: string } = {
  [CustomFieldEntityType.User]: "User custom fields",
  [CustomFieldEntityType.Users]: "Users custom fields",
  [CustomFieldEntityType.Pipeline]: "Board custom feilds",
  [CustomFieldEntityType.Task]: "Task custom fields",
};

type Props = {
  entityId: string;
  entityType: CustomFieldEntityType;
  pipelineId?: string | null;
};
function CustomFieldsInModalWrap({
  entityId,
  entityType,
  pipelineId = null,
}: Props) {
  const {
    state: { is_customFields },
  } = useContext(AppContext);

  const creationDescription = descriptions[entityType];
  const customFieldsTitle = titles[entityType];

  return (
    <>
      {is_customFields ? (
        <div>
          <CustomFieldsContextProvider
            entityId={entityId}
            entityType={entityType}
            pipelineId={pipelineId}
          >
            <CustomFieldCreation
              entityId={entityId}
              entityType={entityType}
              description={creationDescription}
            />
            <h2 className="wpqt-text-center">{customFieldsTitle}</h2>
            <CustomFields />
          </CustomFieldsContextProvider>
        </div>
      ) : (
        <div>
          <CustomFieldsAd
            title="Board custom fields"
            description="Add board custom fields"
          />
        </div>
      )}
    </>
  );
}

export { CustomFieldsInModalWrap };
