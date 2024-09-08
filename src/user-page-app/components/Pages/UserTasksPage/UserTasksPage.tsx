import { useContext } from "@wordpress/element";
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
  } = useContext(UserAssignedTasksContext);

  return (
    <PageWrap loading={loading}>
      <PageContentWrap>
        <h1>Assigned Tasks</h1>
        <UserTasks />
      </PageContentWrap>
    </PageWrap>
  );
}

export { UserTasksPage };
