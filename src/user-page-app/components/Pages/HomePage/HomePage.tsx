import { useContext, useEffect } from "@wordpress/element";
import { getOverviewRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";

function HomePage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);

  useEffect(() => {
    getOverviewData();
  }, []);

  const getOverviewData = async () => {
    try {
      const response = await getOverviewRequest(pageHash);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}

export { HomePage };
