import { useContext, useEffect, useState } from "@wordpress/element";
import { Task } from "../../../../types/task";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { getAssignedTaskDataRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useParams } from "react-router-dom";
import { convertTaskFromServer } from "../../../../utils/task";

function UserTaskPage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<null | Task>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPageTask(Number(taskId));
  }, [taskId]);

  const getUserPageTask = async (taskId: number) => {
    try {
      setLoading(true);
      const response = await getAssignedTaskDataRequest(pageHash, taskId);

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap loading={loading}>
      <PageContentWrap>{JSON.stringify(task)}</PageContentWrap>
    </PageWrap>
  );
}

export { UserTaskPage };
