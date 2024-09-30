import { WPQTComment, WPQTCommentFromServer } from "../types/comment";

const convertCommentFromServer = (
  comment: WPQTCommentFromServer,
): WPQTComment => ({
  ...comment,
  is_admin_comment: comment.is_admin_comment === "1",
});

export { convertCommentFromServer };
