import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TfiSave } from "react-icons/tfi";
import { WPQTIconButton } from "../../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTTextarea } from "../../../../components/common/TextArea/TextArea";
import { SET_CUSTOM_USER_PAGE_STYLES } from "../../../../constants";
import { useSettingActions } from "../../../../hooks/actions/useSettingActions";
import { AppContext } from "../../../../providers/AppContextProvider";
import { Settings } from "../Settings/Settings";

const CustomStyleSetting = () => {
  const {
    state: { userPageCustomStyles: initialUserPageCustomStyles },
    appDispatch,
  } = useContext(AppContext);
  const [userPageCustomStyles, setUserPageCustomStylesState] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { saveCustomUserPageStyles } = useSettingActions();

  useEffect(() => {
    setUserPageCustomStylesState(initialUserPageCustomStyles);
  }, [initialUserPageCustomStyles]);

  const onSave = async () => {
    setIsSaving(true);
    await saveCustomUserPageStyles(userPageCustomStyles, (styles) => {
      appDispatch({
        type: SET_CUSTOM_USER_PAGE_STYLES,
        payload: styles,
      });
    });
    setIsSaving(false);
  };

  return (
    <Settings
      title={__("Custom style", "quicktasker")}
      description={__(
        "Add custom CSS rules for user tasks page.",
        "quicktasker",
      )}
    >
      <WPQTTextarea
        value={userPageCustomStyles}
        onChange={setUserPageCustomStylesState}
        colsCount={40}
      />

      <WPQTIconButton
        text={__("Save", "quicktasker")}
        loading={isSaving}
        onClick={onSave}
        icon={<TfiSave className="wpqt-icon-blue wpqt-size-4" />}
      />
    </Settings>
  );
};

export { CustomStyleSetting };
