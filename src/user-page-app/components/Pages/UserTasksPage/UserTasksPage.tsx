import { UserAssignedTasksContextProvider } from "../../../providers/UserAssignedTasksContextProvider";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { UserTasks } from "./UserTasks";

function UserTasksPage() {
  console.log("UserTasksPage");
  return (
    <UserAssignedTasksContextProvider>
      <PageWrap>
        <PageContentWrap>
          <h1>Assigned Tasks</h1>
          <UserTasks />
        </PageContentWrap>
      </PageWrap>
    </UserAssignedTasksContextProvider>
  );
}

export { UserTasksPage };
