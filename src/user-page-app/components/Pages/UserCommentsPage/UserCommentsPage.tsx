import { useEffect, useState } from "@wordpress/element";
import { CommentsApp } from "../../CommentsApp/CommentsApp";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { WPQTComment } from "../../../../types/comment";
import { useCommentActions } from "../../../hooks/actions/useCommentActions";

function UserCommentsPage() {
  const [userComments, setUserComments] = useState<WPQTComment[]>([]);
  const [loading, setLoading] = useState(true);
  const { loadUserComments, addUserComment } = useCommentActions();

  useEffect(() => {
    getUserComments();
  }, []);

  const getUserComments = async () => {
    setLoading(true);
    await loadUserComments((comments) => {
      setUserComments(comments);
    });
    setLoading(false);
  };
  const onAddUserComment = async (comment: string) => {
    await addUserComment(comment, (comments) => {
      setUserComments(comments);
    });
  };
  return (
    <PageWrap loading={loading} onRefresh={getUserComments}>
      <PageContentWrap>
        <CommentsApp comments={userComments} addComments={onAddUserComment} />
      </PageContentWrap>
    </PageWrap>
  );
}

export { UserCommentsPage };
