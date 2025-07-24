import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_ASSIGNED_TASKS_SEARCH_TEXT } from "../../../constants";
import {
  UserAssignedTasksContext,
  UserAssignedTasksContextProvider,
} from "../../../providers/UserAssignedTasksContextProvider";
import { TaskFilter } from "../../Filter/TaskFilter/TaskFilter";
import { PageContentWrap, PageTitle, PageWrap } from "../Page/Page";
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
    state: { loading, searchText },
    loadAssignedTasks,
    userAssignedTasksDispatch,
  } = useContext(UserAssignedTasksContext);

  return (
    <PageWrap loading={loading} onRefresh={loadAssignedTasks}>
      <PageContentWrap>
        <PageTitle
          description={__("Tasks that are assigned to you", "quicktasker")}
        >
          {__("Assigned tasks", "quicktasker")}
        </PageTitle>
        <TaskFilter
          title={__("Filter tasks", "quicktasker")}
          searchValue={searchText}
          onSearchChange={(value) => {
            userAssignedTasksDispatch({
              type: SET_ASSIGNED_TASKS_SEARCH_TEXT,
              payload: value,
            });
          }}
        />
        <UserTasks />
      </PageContentWrap>
    </PageWrap>
  );
}

export { UserTasksPage };
