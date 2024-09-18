import { useContext, useEffect, useState } from "@wordpress/element";
import { getOverviewRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { UserPageOverview } from "../../../types/user-page-overview";
import { WPQTButton } from "../../../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

function HomePage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<null | UserPageOverview>(null);
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    getOverviewData();
  }, []);

  const getOverviewData = async () => {
    try {
      setLoading(true);
      const response = await getOverviewRequest(pageHash);

      setOverview(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap loading={loading} onRefresh={getOverviewData}>
      <PageContentWrap>
        <h1>Overview</h1>
        <div>Assigned tasks: {overview?.assignedTasksCount}</div>

        <WPQTButton
          btnText="See assigned taks"
          onClick={() => navigate("/user-tasks")}
        ></WPQTButton>

        <div>Assignable tasks: {overview?.assignableTaskCount}</div>

        <WPQTButton
          btnText="See assignable tasks"
          onClick={() => navigate("/assignable-tasks")}
        ></WPQTButton>
      </PageContentWrap>
    </PageWrap>
  );
}

export { HomePage };
