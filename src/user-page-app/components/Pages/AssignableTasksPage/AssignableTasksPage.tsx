import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useNavigate } from "react-router-dom";
import { WPQTCard } from "../../../../components/Card/Card";
import {
  UserAssignableTasksContext,
  UserAssignableTasksContextProvider,
} from "../../../providers/UserAssignableTasksContextProvider";
import { PageContentWrap, PageTitle, PageWrap } from "../Page/Page";

function AssignableTasksPage() {
  return (
    <UserAssignableTasksContextProvider>
      <AssignebaleTasksPageContent />
    </UserAssignableTasksContextProvider>
  );
}

function AssignebaleTasksPageContent() {
  const {
    state: { loading, assignableTasks },
    loadAssignableTasks,
  } = useContext(UserAssignableTasksContext);
  const navigate = useNavigate();

  return (
    <PageWrap loading={loading} onRefresh={loadAssignableTasks}>
      <PageContentWrap>
        <PageTitle
          description={__("Tasks available for self-assignment", "quicktasker")}
        >
          {__("Assignable tasks", "quicktasker")}
        </PageTitle>
        <div className="wpqt-grid wpqt-grid-cols-1 sm:wpqt-grid-cols-2 lg:wpqt-grid-cols-4 wpqt-gap-2 ">
          {assignableTasks.map((task) => (
            <WPQTCard
              key={task.task_hash}
              className="wpqt-cursor-pointer"
              title={task.name}
              description={task.description}
              onClick={() => navigate(`/tasks/${task.task_hash}`)}
            ></WPQTCard>
          ))}
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { AssignableTasksPage };
