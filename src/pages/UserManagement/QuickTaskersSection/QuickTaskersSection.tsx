import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTInput } from "../../../components/common/Input/Input";
import { UserLogsModal } from "../../../components/Modal/UserLogsModal/UserLogsModal";
import { UserModal } from "../../../components/Modal/UserModal/UserModal";
import { SET_USERS_SEARCH_VALUE } from "../../../constants";
import { UserContext } from "../../../providers/UserContextProvider";
import { AddUser } from "./components/AddUser/AddUser";
import { UserList } from "./components/UserList/UserList";

function QuickTaskersSection() {
  const {
    state: { users, usersSearchValue },
    userDispatch,
  } = useContext(UserContext);

  const hasUsers = users && users.length > 0;

  return (
    <div>
      <div className="wpqt-flex wpqt-items-start wpqt-justify-between wpqt-mb-4">
        <AddUser />
        {hasUsers && (
          <WPQTInput
            value={usersSearchValue}
            onChange={(v) =>
              userDispatch({ type: SET_USERS_SEARCH_VALUE, payload: v })
            }
            placeholder={__("Search by name", "quicktasker")}
            className="wpqt-w-52"
            wrapperClassName="!wpqt-mb-0"
            leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
          />
        )}
      </div>
      <div className="wpqt-mb-2">
        {__(
          "QuickTaskers are plugin-managed users, separate from WordPress accounts, who access tasks through the tasks app.",
          "quicktasker",
        )}
      </div>
      <UserList />
      <UserModal />
      <UserLogsModal />
    </div>
  );
}

export { QuickTaskersSection };
