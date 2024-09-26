import { useContext } from "@wordpress/element";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { useParams } from "react-router-dom";
import { TaskDetaials } from "./TaskDetails/TaskDetails";
import { TaskControls } from "./TaskControls/TaskControls";
import {
  UserPageTaskContext,
  UserPageTaskContextProvider,
} from "../../../providers/UserPageTaskContextProvider";
import { TaskStageSelect } from "./TaskStageSelect/TaskStageSelect";

function TaskPage() {
  const { taskHash } = useParams<{ taskHash: string }>();

  return (
    <UserPageTaskContextProvider taskHash={taskHash}>
      <TaskPageContent />
    </UserPageTaskContextProvider>
  );
}

function TaskPageContent() {
  const {
    state: { loading, task },
    loadTask,
  } = useContext(UserPageTaskContext);
  return (
    <PageWrap loading={loading} onRefresh={loadTask}>
      <PageContentWrap>
        <TaskDetaials task={task} />
        <TaskStageSelect task={task} />
        <TaskControls task={task} />
      </PageContentWrap>
    </PageWrap>
  );
}

export { TaskPage };
