import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { CommentBox } from "../../../components/CommentBox/CommentBox";
import { WPQTIconButton } from "../../../components/common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTTextarea } from "../../../components/common/TextArea/TextArea";
import { WPQTComment } from "../../../types/comment";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { UserPageNotificationsContext } from "../../providers/UserPageNotificationsContextProvider";

type Props = {
  comments: WPQTComment[];
  addComments: (comment: string) => Promise<void>;
};
function CommentsApp({ comments, addComments }: Props) {
  const { checkNewComments } = useContext(UserPageNotificationsContext);
  const [comment, setComment] = useState("");
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const { storeComments } = useLocalStorage();

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTo({
        top: commentsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [comments]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      storeSeenComments();
    }
  }, [comments]);

  const saveComment = async () => {
    if (!comment) {
      toast.error(__("Comment cant be empty", "quicktasker"));
      return;
    }
    setAddCommentLoading(true);
    await addComments(comment);
    setComment("");
    setAddCommentLoading(false);
  };

  const storeSeenComments = async () => {
    await storeComments(comments);
    await checkNewComments();
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-7">
      <div
        ref={commentsContainerRef}
        className="wpqt-comments-app-height wpqt-overflow-y-auto"
      >
        {comments && comments.length === 0 ? (
          <div className="wpqt-text-center">
            {__("No comments found", "quicktasker")}
          </div>
        ) : (
          <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-4">
            {comments.map((comment) => {
              return (
                <CommentBox
                  authorName={comment.author_name ?? ""}
                  authorType={comment.author_type}
                  commentDate={comment.created_at}
                  key={comment.id}
                >
                  {comment.text}
                </CommentBox>
              );
            })}
          </div>
        )}
      </div>
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-w-full md:wpqt-w-2/4 wpqt-mx-auto">
        <WPQTTextarea
          value={comment}
          onChange={setComment}
          className="wpqt-w-full"
          placeholder={__("Write a comment...", "quicktasker")}
        />
        <WPQTIconButton
          loading={addCommentLoading}
          text={__("Add comment", "quicktasker")}
          onClick={saveComment}
          icon={<ChatBubbleLeftIcon className="wpqt-icon-green wpqt-size-5" />}
        />
      </div>
    </div>
  );
}

export { CommentsApp };
