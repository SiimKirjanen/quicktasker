import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
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
    <PageWrap
      loading={loading}
      onRefresh={getOverviewData}
      className="wpqt-flex wpqt-items-center wpqt-justify-center"
    >
      <PageContentWrap>
        <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-gap-2">
          <div>
            {__("Assigned tasks:", "quicktasker")}{" "}
            {overview?.assignedTasksCount}
          </div>
          <WPQTButton
            btnText={__("See assigned tasks", "quicktasker")}
            onClick={() => navigate("/user-tasks")}
            className="wpqt-mb-4"
          ></WPQTButton>

          <div>
            {__("Assignable tasks:", "quicktasker")}{" "}
            {overview?.assignableTaskCount}
          </div>
          <WPQTButton
            btnText={__("See assignable tasks", "quicktasker")}
            onClick={() => navigate("/assignable-tasks")}
          ></WPQTButton>
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { HomePage };
