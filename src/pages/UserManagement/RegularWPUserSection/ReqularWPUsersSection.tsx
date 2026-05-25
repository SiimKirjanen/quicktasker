import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTIconButton } from "../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTInput } from "../../../components/common/Input/Input";
import { NoFilterResults } from "../../../components/Filter/NoFilterResults/NoFilterResults";
import { UserContext } from "../../../providers/UserContextProvider";
import { WPUserItem } from "../components/WPUserItem/WPUserItem";

function RegularWPUsersSection() {
  const {
    state: { wpUsers },
  } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");

  const hasUsers = wpUsers.length > 0;

  const filteredUsers = wpUsers.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div>
      <div className="wpqt-flex wpqt-items-start wpqt-justify-between wpqt-mb-4">
        <WPQTIconButton
          text={__("Add WordPress user", "quicktasker")}
          onClick={() => {
            window.location.href = "/wp-admin/user-new.php";
          }}
          icon={<UserPlusIcon className="wpqt-icon-green wpqt-size-5" />}
        />
        {hasUsers && (
          <WPQTInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder={__("Search by name", "quicktasker")}
            className="wpqt-w-52"
            wrapperClassName="!wpqt-mb-0"
            leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
          />
        )}
      </div>
      {!hasUsers ? (
        <NoFilterResults
          text={__(
            "No WordPress users without administrator privileges found",
            "quicktasker",
          )}
        />
      ) : (
        <>
          <div className="wpqt-mb-2">
            {__(
              "WordPress users without administrator privileges.",
              "quicktasker",
            )}
          </div>
          {filteredUsers.length === 0 ? (
            <NoFilterResults />
          ) : (
            <div className="wpqt-card-grid">
              {filteredUsers.map((user) => (
                <WPUserItem key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { RegularWPUsersSection };
