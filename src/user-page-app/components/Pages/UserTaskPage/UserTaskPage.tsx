import { useContext, useEffect, useState } from "@wordpress/element";
import { Task } from "../../../../types/task";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { getAssignedTaskDataRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useParams } from "react-router-dom";
import { convertTaskFromServer } from "../../../../utils/task";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

function UserTaskPage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<null | Task>(null);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    getUserPageTask();
  }, [taskId]);

  const getUserPageTask = async () => {
    try {
      setLoading(true);
      const response = await getAssignedTaskDataRequest(
        pageHash,
        Number(taskId),
      );

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap loading={loading} onRefresh={getUserPageTask}>
      <PageContentWrap>{JSON.stringify(task)}</PageContentWrap>
    </PageWrap>
  );
}

export { UserTaskPage };
