import { Input } from "@headlessui/react";
import { useContext } from "@wordpress/element";
import { UserContext } from "../../../providers/UserContextProvider";
import { SET_USERS_SEARCH_VALUE } from "../../../constants";
import { WPQTFilter } from "../WPQTFilter";

function UserFilter() {
  const {
    state: { usersSearchValue },
    userDispatch,
  } = useContext(UserContext);

  const setArchiveSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    userDispatch({
      type: SET_USERS_SEARCH_VALUE,
      payload: event.target.value,
    });
  };

  return (
    <WPQTFilter title="User filtering">
      <Input
        type="text"
        value={usersSearchValue}
        onChange={setArchiveSearchValue}
      />
    </WPQTFilter>
  );
}

export { UserFilter };
