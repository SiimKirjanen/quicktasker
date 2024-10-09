import { useContext, useState } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { CustomField } from "./components/CustomField/CustomField";
import { CustomFieldsContext } from "../../../providers/CustomFieldsContextProvider";
import { WPQTIconButton } from "../../common/Button/Button";
import { EyeIcon } from "@heroicons/react/24/outline";

function CustomFields() {
  const {
    state: { loading, customFields },
  } = useContext(CustomFieldsContext);
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="wpqt-flex wpqt-justify-center">
        <LoadingOval width="36" height="36" />
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="wpqt-flex wpqt-justify-center">
        <WPQTIconButton
          text="Show custom fields"
          onClick={() => setIsOpen(true)}
          icon={<EyeIcon className="wpqt-icon-blue wpqt-size-5" />}
        />
      </div>
    );
  }

  return (
    <>
      <div className="wpqt-my-6 wpqt-grid wpqt-grid-cols-[100px_1fr_100px] wpqt-items-center wpqt-gap-3">
        {customFields.map((customField) => (
          <CustomField key={customField.id} data={customField} />
        ))}
      </div>
      <div className="wpqt-flex wpqt-justify-center">
        <WPQTIconButton
          text="Close custom fields"
          onClick={() => setIsOpen(false)}
          icon={<EyeIcon className="wpqt-icon-red wpqt-size-5" />}
        />
      </div>
    </>
  );
}

export { CustomFields };
