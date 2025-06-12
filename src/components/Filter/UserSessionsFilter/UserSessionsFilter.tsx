import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_USER_SESSIONS_SEARCH_VALUE } from "../../../constants";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTFilter, WPQTFilterSection } from "../WPQTFilter";

function UserSessionsFilter() {
  const {
    state: { sessionsSearchValue },
    usersSessionDispatch,
  } = useContext(UserSessionsContext);

  const setSessionSearchValue = (value: string) => {
    usersSessionDispatch({
      type: SET_USER_SESSIONS_SEARCH_VALUE,
      payload: value,
    });
  };

  return (
    <WPQTFilter
      title={__("Session filtering", "quicktasker")}
      searchChildren={
        <WPQTFilterSection
          title={__("Search", "quicktasker")}
          labelIdFor="session-search"
        >
          <WPQTInput
            inputId="session-search"
            value={sessionsSearchValue}
            onChange={setSessionSearchValue}
          />
        </WPQTFilterSection>
      }
    ></WPQTFilter>
  );
}

export { UserSessionsFilter };
