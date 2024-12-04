import { useEffect, useState } from "@wordpress/element";
import { getWPUsersRequest } from "../../../api/api";
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

  if (loading || !users) {
    return <Loading ovalSize="48" />;
  }

  return (
    <div className="wpqt-card-grid">
      {users.map((user) => {
        return <WPUserItem key={user.id} user={user} />;
      })}
    </div>
  );
}

export { RegularWPUsersSection };
