type BaseComment = {
  id: string;
  text: string;
  type: "task" | "user";
  type_id: string;
};

type WPQTComment = BaseComment;
type WPQTCommentFromServer = BaseComment;

export type { WPQTComment, WPQTCommentFromServer };
