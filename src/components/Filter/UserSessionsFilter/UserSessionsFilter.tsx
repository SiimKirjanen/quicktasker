import { useContext } from "@wordpress/element";
import { WPQTFilter } from "../WPQTFilter";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import { SET_USER_SESSIONS_SEARCH_VALUE } from "../../../constants";
import { WPQTInput } from "../../common/Input/Input";

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
    <WPQTFilter title="Session filtering">
      <WPQTInput value={sessionsSearchValue} onChange={setSessionSearchValue} />
    </WPQTFilter>
  );
}

export { UserSessionsFilter };
