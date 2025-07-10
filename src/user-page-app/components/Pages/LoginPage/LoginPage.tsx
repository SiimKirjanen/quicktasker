import { useContext } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { PageScreenMiddle, PageTitle } from "../Page/Page";
import { QuickTaskerUserLogin } from "./components/QuickTaskerUserLogin/QuickTaskerUserLogin";

function LoginPage() {
  const {
    state: { userName, isQuicktaskerUser, isWordPressUser },
  } = useContext(UserPageAppContext);

  if (isQuicktaskerUser) {
    return <QuickTaskerUserLogin />;
  }

  if (isWordPressUser) {
    return (
      <PageScreenMiddle>
        <PageTitle
          titleClassName="wpqt-font-normal"
          className="wpqt-mb-2"
          description={__("Your WordPress session has expired", "quicktasker")}
        >
          {sprintf(__("Hello", "quicktasker"), userName)}
        </PageTitle>
        <p>{__("Please log in to continue", "quicktasker")}</p>
      </PageScreenMiddle>
    );
  }

  return null;
}

export { LoginPage };
