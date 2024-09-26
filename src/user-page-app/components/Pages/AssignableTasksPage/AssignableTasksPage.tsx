import { useContext } from "@wordpress/element";
import { useNavigate } from "react-router-dom";
import { PageContentWrap, PageWrap } from "../Page/Page";
import {
  UserAssignableTasksContext,
  UserAssignableTasksContextProvider,
} from "../../../providers/UserAssignableTasksContextProvider";
import { WPQTCard } from "../../../../components/Card/Card";

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
        <h1>Assignable tasks</h1>
        <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-2 sm:wpqt-grid-cols-2 lg:wpqt-grid-cols-4">
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
