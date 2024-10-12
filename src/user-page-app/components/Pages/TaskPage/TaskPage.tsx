import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useParams } from "react-router-dom";
import { CustomFieldEntityType } from "../../../../types/custom-field";
import {
  UserPageTaskContext,
  UserPageTaskContextProvider,
} from "../../../providers/UserPageTaskContextProvider";
import { CustomFieldsWrap } from "../../CustomField/CustomFieldsWrap/CustomFieldsWrap";
import { PageContentWrap, PageTitle, PageWrap } from "../Page/Page";
import { TaskControls } from "./TaskControls/TaskControls";
import { TaskDetails } from "./TaskDetails/TaskDetails";
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
    state: { loading, task, customFields },
    loadTask,
  } = useContext(UserPageTaskContext);

  if (!task) {
    return null;
  }
  return (
    <PageWrap loading={loading} onRefresh={loadTask}>
      <PageContentWrap>
        <PageTitle> {__("Task details", "quicktasker")}</PageTitle>
        <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
          <TaskDetails task={task} />
          <TaskStageSelect task={task} />
          <CustomFieldsWrap
            entityId={task.id}
            entityType={CustomFieldEntityType.Task}
            customFields={customFields}
          />
          <TaskControls task={task} />
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { TaskPage };
