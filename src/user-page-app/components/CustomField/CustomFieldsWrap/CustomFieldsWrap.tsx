import { useContext } from "@wordpress/element";
import {
  CustomField,
  CustomFieldEntityType,
} from "../../../../types/custom-field";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";

type Props = {
  entityId: string;
  entityType: CustomFieldEntityType.Task | CustomFieldEntityType.User;
  customFields: CustomField[];
};

function CustomFieldsWrap({ customFields }: Props) {
  const {
    state: { cf },
  } = useContext(UserPageAppContext);

  if (!cf) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
      {customFields.map((cf) => (
        <div key={cf.id}>{cf.name}</div>
      ))}
    </div>
  );
}

export { CustomFieldsWrap };
