import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Page } from "../Page/Page";
import { UserTasksFilter } from "../../components/Filter/UserTasksFilter/UserTasksFilter";
import { UserTasksContextProvider } from "../../providers/UserTasksContextProvider";
import { UserTasks } from "./UserTasks";

type Props = {
  userId: string;
};

function UserTasksPage({ userId }: Props) {
  return (
    <UserTasksContextProvider userId={userId}>
      <Page>
        <WPQTPageHeader description="Tasks assigned to user">
          User tasks
        </WPQTPageHeader>
        <UserTasksFilter />
        <UserTasks userId={userId} />
      </Page>
    </UserTasksContextProvider>
  );
}

export { UserTasksPage };
