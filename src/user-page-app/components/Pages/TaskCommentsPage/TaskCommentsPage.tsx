import { useParams } from "react-router-dom";
import { CommentsApp } from "../../CommentsApp/CommentsApp";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { useContext, useEffect, useState } from "@wordpress/element";
import { WPQTComment } from "../../../../types/comment";
import { useCommentActions } from "../../../hooks/actions/useCommentActions";
import { Task } from "../../../../types/task";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { UserPageTaskResponse } from "../../../types/user-page-task-response";
import { convertTaskFromServer } from "../../../../utils/task";
import { convertCommentFromServer } from "../../../../utils/comment";

function TaskCommentsPage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { taskHash } = useParams<{ taskHash: string }>();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<WPQTComment[]>([]);
  const { loadTaskComments, addTaskComment } = useCommentActions();
  const { getTask } = useTaskActions();

  useEffect(() => {
    loadTask();
    loadComments();
  }, []);

  const loadTask = async () => {
    await getTask(pageHash, taskHash!, (data: UserPageTaskResponse) => {
      setTask(convertTaskFromServer(data.task));
    });
  };
  const loadComments = async () => {
    setLoading(true);
    await loadTaskComments(pageHash, taskHash!, (comments) => {
      setComments(comments.map(convertCommentFromServer));
    });
    setLoading(false);
  };
  const onAddComment = async (comment: string) => {
    await addTaskComment(task!.task_hash, comment, (comments) => {
      setComments(comments);
    });
  };

  return (
    <PageWrap loading={loading} onRefresh={loadComments}>
      <PageContentWrap>
        {task && <h2>{task.name} comments</h2>}
        {comments && (
          <CommentsApp comments={comments} addComments={onAddComment} />
        )}
      </PageContentWrap>
    </PageWrap>
  );
}

export { TaskCommentsPage };
