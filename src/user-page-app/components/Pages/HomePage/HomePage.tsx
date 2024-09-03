import { useEffect } from "@wordpress/element";
import { getOverviewRequest } from "../../../api/user-page-api";

function HomePage() {
  useEffect(() => {
    getOverviewData();
  }, []);

  const getOverviewData = async () => {
    try {
      const response = await getOverviewRequest();
      console.log(response);
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
