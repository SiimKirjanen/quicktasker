import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { PageScreenMiddle, PageTitle } from "../Page/Page";
import { QuickTaskerUserLogin } from "./components/QuickTaskerUserLogin/QuickTaskerUserLogin";

function LoginPage() {
  const {
    state: { isQuicktaskerUser, isWordPressUser },
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
          description={__("Your session has expired", "quicktasker")}
        >
          {__("Hello", "quicktasker")}
        </PageTitle>
        <p>{__("Please log in to WordPress", "quicktasker")}</p>
      </PageScreenMiddle>
    );
  }

  return null;
}

export { LoginPage };
