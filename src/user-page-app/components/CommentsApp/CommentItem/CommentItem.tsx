import { __ } from "@wordpress/i18n";
import { WPQTComment } from "../../../../types/comment";

function CommentItem({ comment }: { comment: WPQTComment }) {
  const isAdminComment = comment.is_admin_comment;

  return (
    <>
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center">
        <div
          className={
            isAdminComment
              ? "wpqt-font-semibold wpqt-text-lg"
              : "wpqt-font-normal"
          }
        >
          {comment.author_name}
        </div>
        <div className="wpqt-text-sm">
          {isAdminComment
            ? __("Admin", "quicktasker")
            : __("User", "quicktasker")}
        </div>
      </div>
      <div className="wpqt-break-all wpqt-text-center">{comment.text}</div>
    </>
  );
}

export { CommentItem };
