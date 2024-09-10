import { useContext, useEffect, useState } from "@wordpress/element";
import { Task } from "../../../../types/task";
import { PageContentWrap, PageWrap } from "../Page/Page";
import {
  assignTaskToUser,
  getTaskDataRequest,
  unAssignTaskFromUser,
} from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useParams } from "react-router-dom";
import { convertTaskFromServer } from "../../../../utils/task";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { WPQTButton } from "../../../../components/common/Button/Button";
import { UserAssignableTasksContext } from "../../../providers/UserAssignableTasksContextProvider";
import { REMOVE_ASSIGNABLE_TASK } from "../../../constants";

function TaskPage() {
  const {
    state: { pageHash, userId },
  } = useContext(UserPageAppContext);
  const { userAssignableTasksDispatch } = useContext(
    UserAssignableTasksContext,
  );
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<null | Task>(null);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();
  const isAssignedToTask = task?.assigned_users.some(
    (user) => user.id === userId,
  );

  useEffect(() => {
    getUserPageTask();
  }, [taskId]);

  const getUserPageTask = async () => {
    try {
      setLoading(true);
      const response = await getTaskDataRequest(pageHash, taskId!);

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const assignTask = async () => {
    try {
      const response = await assignTaskToUser(pageHash, task!.id);

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const unAssignTask = async () => {
    try {
      const response = await unAssignTaskFromUser(pageHash, task!.id);

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <PageWrap loading={loading} onRefresh={getUserPageTask}>
      <PageContentWrap>
        {task && (
          <>
            {JSON.stringify(task)}
            {isAssignedToTask && (
              <WPQTButton onClick={unAssignTask} btnText="Unassign from task" />
            )}
            {!isAssignedToTask && (
              <WPQTButton onClick={assignTask} btnText="Assign task" />
            )}
          </>
        )}
      </PageContentWrap>
    </PageWrap>
  );
}

export { TaskPage };
