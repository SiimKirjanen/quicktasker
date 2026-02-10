type WPQTAuthorType = "quicktasker" | "wp-user";

type BaseComment = {
  id: string;
  text: string;
  type: "task" | WPQTAuthorType;
  type_id: string;
  author_id: string | null;
  author_type: WPQTAuthorType;
  author_name: string | null;
  created_at: string;
  subject_name?: string;
  subject_hash?: string;
};

type WPQTComment = BaseComment;

export type { WPQTAuthorType, WPQTComment };
