import { useContext } from "@wordpress/element";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { useParams } from "react-router-dom";
import { TaskDetails } from "./TaskDetails/TaskDetails";
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
        <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
          <TaskDetails task={task} />
          <TaskStageSelect task={task} />
          <TaskControls task={task} />
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { TaskPage };
