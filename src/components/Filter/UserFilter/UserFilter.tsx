import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_USERS_SEARCH_VALUE } from "../../../constants";
import { UserContext } from "../../../providers/UserContextProvider";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTFilter, WPQTFilterSection } from "../WPQTFilter";

function UserFilter() {
  const {
    state: { usersSearchValue },
    userDispatch,
  } = useContext(UserContext);

  const setArchiveSearchValue = (newValue: string) => {
    userDispatch({
      type: SET_USERS_SEARCH_VALUE,
      payload: newValue,
    });
  };

  return (
    <WPQTFilter
      title={__("User filtering", "quicktasker")}
      searchChildren={
        <WPQTFilterSection
          title={__("Search", "quicktasker")}
          labelIdFor="user-search"
        >
          <WPQTInput
            inputId="user-search"
            value={usersSearchValue}
            onChange={setArchiveSearchValue}
          />
        </WPQTFilterSection>
      }
    ></WPQTFilter>
  );
}

export { UserFilter };
