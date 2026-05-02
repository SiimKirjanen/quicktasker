import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getWPUsersRequest } from "../../../api/api";
import { WPQTIconButton } from "../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTInput } from "../../../components/common/Input/Input";
import { NoFilterResults } from "../../../components/Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../../components/Loading/Loading";
import { WPQTWpUserTypes } from "../../../types/enums";
import { WPUser } from "../../../types/user";
import { WPUserItem } from "../components/WPUserItem/WPUserItem";

function RegularWPUsersSection() {
  const [users, setUsers] = useState<WPUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getWPUsersRequest(WPQTWpUserTypes.Other);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading || users === null) {
    return <Loading ovalSize="48" />;
  }

  const hasUsers = users.length > 0;

  const filteredUsers = users.filter((user) =>
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
          <div className="wpqt-relative wpqt-flex wpqt-items-center wpqt-w-52">
            <MagnifyingGlassIcon className="wpqt-absolute wpqt-left-2 wpqt-size-4 wpqt-text-gray-400 wpqt-pointer-events-none" />
            <WPQTInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder={__("Search by name", "quicktasker")}
              className="wpqt-pl-7 wpqt-w-full"
              wrapperClassName="!wpqt-mb-0 wpqt-w-full"
            />
          </div>
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
