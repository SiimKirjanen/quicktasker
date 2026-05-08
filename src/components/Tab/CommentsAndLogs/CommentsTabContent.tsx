import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getComments } from "../../../api/api";
import { useCommentActions } from "../../../hooks/actions/useCommentActions";
import { WPQTComment } from "../../../types/comment";
import { WPQTTypes } from "../../../types/enums";
import { UserTypes } from "../../../types/user";
import { CommentBox } from "../../CommentBox/CommentBox";
import { CommentsAndLogsTabContent } from "./CommentsAndLogsTabContent";

type CommentSubjectType = WPQTTypes.Task | UserTypes.QUICKTASKER;

type Props = {
  subjectId: string;
  subjectType: CommentSubjectType;
  isPrivate: boolean;
};

function CommentsTabContent({ subjectId, subjectType, isPrivate }: Props) {
  const { addComment } = useCommentActions();

  const onAddComment = async (newEntry: string) => {
    const response = await addComment(
      subjectId,
      subjectType,
      isPrivate,
      newEntry,
    );

    if (response) {
      return response;
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(subjectId, subjectType, isPrivate);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load comments", "quicktasker"));
    }
  };

  return (
    <CommentsAndLogsTabContent<WPQTComment>
      typeId={subjectId}
      fetchData={fetchComments}
      onAdd={onAddComment}
      renderItem={(comment: WPQTComment) => (
        <CommentBox
          authorName={comment.author_name ?? ""}
          authorType={comment.author_type}
          commentDate={comment.created_at}
          key={comment.id}
        >
          {comment.text}
        </CommentBox>
      )}
      noDataMessage={__("No comments available", "quicktasker")}
      enableAdd={true}
    />
  );
}

export { CommentsTabContent };
