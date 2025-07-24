import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_ASSIGNABLE_TASKS_SEARCH_TEXT } from "../../../constants";
import {
  UserAssignableTasksContext,
  UserAssignableTasksContextProvider,
} from "../../../providers/UserAssignableTasksContextProvider";
import { TaskFilter } from "../../Filter/TaskFilter/TaskFilter";
import { PageContentWrap, PageTitle, PageWrap } from "../Page/Page";
import { AssignebaleTasks } from "./AssignableTasks";

function AssignableTasksPage() {
  return (
    <UserAssignableTasksContextProvider>
      <AssignebaleTasksPageContent />
    </UserAssignableTasksContextProvider>
  );
}

function AssignebaleTasksPageContent() {
  const {
    state: { loading, searchText },
    loadAssignableTasks,
    userAssignableTasksDispatch,
  } = useContext(UserAssignableTasksContext);

  return (
    <PageWrap loading={loading} onRefresh={loadAssignableTasks}>
      <PageContentWrap>
        <PageTitle
          description={__("Tasks available for self-assignment", "quicktasker")}
        >
          {__("Assignable tasks", "quicktasker")}
        </PageTitle>
        <TaskFilter
          title={__("Filter tasks", "quicktasker")}
          searchValue={searchText}
          onSearchChange={(value) => {
            userAssignableTasksDispatch({
              type: SET_ASSIGNABLE_TASKS_SEARCH_TEXT,
              payload: value,
            });
          }}
        />
        <AssignebaleTasks />
      </PageContentWrap>
    </PageWrap>
  );
}

export { AssignableTasksPage, AssignebaleTasksPageContent };
