import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  UserAssignedTasksContext,
  UserAssignedTasksContextProvider,
} from "../../../providers/UserAssignedTasksContextProvider";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { UserTasks } from "./UserTasks";

function UserTasksPage() {
  return (
    <UserAssignedTasksContextProvider>
      <UserTaskPageContent />
    </UserAssignedTasksContextProvider>
  );
}

function UserTaskPageContent() {
  const {
    state: { loading },
    loadAssignedTasks,
  } = useContext(UserAssignedTasksContext);

  return (
    <PageWrap loading={loading} onRefresh={loadAssignedTasks}>
      <PageContentWrap>
        <h1>{__("Assigned Tasks", "quicktasker")}</h1>
        <UserTasks />
      </PageContentWrap>
    </PageWrap>
  );
}

export { UserTasksPage };
