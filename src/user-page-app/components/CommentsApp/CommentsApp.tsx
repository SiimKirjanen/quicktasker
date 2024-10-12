import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTIconButton } from "../../../components/common/Button/Button";
import { WPQTTextarea } from "../../../components/common/TextArea/TextArea";
import { WPQTComment } from "../../../types/comment";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { UserPageNotificationsContext } from "../../providers/UserPageNotificationsContextProvider";

type Props = {
  comments: WPQTComment[];
  addComments: (comment: string) => void;
};
function CommentsApp({ comments, addComments }: Props) {
  const { checkNewComments } = useContext(UserPageNotificationsContext);
  const [comment, setComment] = useState("");
  const commentsContainerRef = useRef<HTMLDivElement>(null);
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

  const saveComment = () => {
    addComments(comment);
    setComment("");
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
        <div className="wpqt-grid wpqt-grid-cols-[auto_1fr_auto] wpqt-justify-items-center wpqt-gap-x-8 wpqt-gap-y-8">
          {comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-max-w-52 wpqt-mx-auto">
        <WPQTTextarea value={comment} onChange={setComment} />
        <WPQTIconButton
          text={__("Add comment", "quicktasker")}
          onClick={saveComment}
          icon={<ChatBubbleLeftIcon className="wpqt-icon-green wpqt-size-5" />}
        />
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: WPQTComment }) {
  return (
    <>
      <div>{comment.author_name}</div>
      <div className="wpqt-break-all">{comment.text}</div>
      <div>{comment.created_at}</div>
    </>
  );
}

export { CommentsApp };
