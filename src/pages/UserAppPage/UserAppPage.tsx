import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TfiSave } from "react-icons/tfi";
import { WPQTIconButton } from "../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { WPQTTextarea } from "../../components/common/TextArea/TextArea";
import { SET_CUSTOM_USER_PAGE_STYLES } from "../../constants";
import { useSettingActions } from "../../hooks/actions/useSettingActions";
import { usePageLinks } from "../../hooks/usePageLinks";
import { AppContext } from "../../providers/AppContextProvider";
import { Page } from "../Page/Page";

function UserAppPage() {
  const {
    state: { userPageCustomStyles: initialUserPageCustomStyles },
    appDispatch,
  } = useContext(AppContext);
  const { userPage } = usePageLinks();
  const [userPageCustomStyles, setUserPageCustomStylesState] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { saveCustomUserPageStyles } = useSettingActions();

  useEffect(() => {
    setUserPageCustomStylesState(initialUserPageCustomStyles);
  }, [initialUserPageCustomStyles]);

  const openUserApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(userPage, "_blank");
  };

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
    <Page>
      <WPQTPageHeader
        description={__(
          "Lets you manage assigned tasks on a separate page.",
          "quicktasker",
        )}
      >
        {__("Tasks app", "quicktasker")}
      </WPQTPageHeader>
      <div>
        <a onClick={openUserApp} href="">
          {__("Open your tasks app", "quicktasker")}
        </a>
        <h2>{__("Custom styles", "quicktasker")}</h2>
        <p>{__("Add custom CSS rules for user tasks page.", "quicktasker")}</p>
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
      </div>
    </Page>
  );
}

export { UserAppPage };
