import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { AppContext } from "../../../../../providers/AppContextProvider";
import {
  CustomField,
  CustomFieldEntityType,
} from "../../../../../types/custom-field";
import { WPQTIconButton } from "../../../../common/Button/WPQTIconButton/WPQTIconButton";
import { Loading } from "../../../../Loading/Loading";

type CustomFieldActionsProps = {
  data: CustomField;
  locationOfCustomFields: CustomFieldEntityType | null;
  onDelete: () => void;
  actionLoading: boolean;
};
function CustomFieldActions({
  data,
  locationOfCustomFields,
  onDelete,
  actionLoading,
}: CustomFieldActionsProps) {
  const {
    state: { isUserAllowedToDelete },
  } = useContext(AppContext);
  const isAllowedToDelete = data.entity_type === locationOfCustomFields;
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

  if (actionLoading) {
    return <Loading ovalSize="24" className="wpqt-ml-auto" />;
  }

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-ml-auto">
      {isUserAllowedToDelete && (
        <WPQTIconButton
          onClick={handleDelete}
          className={`${!isAllowedToDelete ? "!wpqt-cursor-not-allowed" : ""}`}
          icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
          {...(!isAllowedToDelete && {
            tooltipId: `custom-field-${data.id}-delete`,
            tooltipText: sprintf(
              __(
                "This custom field is inherited from %s settings and can't be deleted here",
                "quicktasker",
              ),
              entityTypeDisplay,
            ),
          })}
        />
      )}
    </div>
  );
}

export { CustomFieldActions };
