import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getWPUsersRequest } from "../../../api/api";
import { NoFilterResults } from "../../../components/Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../../components/Loading/Loading";
import { WPQTWpUserTypes } from "../../../types/enums";
import { WPUser } from "../../../types/user";
import { WPUserItem } from "../components/WPUserItem/WPUserItem";

function RegularWPUsersSection() {
  const [users, setUsers] = useState<WPUser[] | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (users.length === 0) {
    return (
      <NoFilterResults
        text={__("No non-admin WordPress users found", "quicktasker")}
      />
    );
  }

  return (
    <div>
      <div className="wpqt-mb-2">
        {__("Displaying non-admin WordPress users.", "quicktasker")}
      </div>
      <div className="wpqt-card-grid">
        {users.map((user) => {
          return <WPUserItem key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

export { RegularWPUsersSection };
