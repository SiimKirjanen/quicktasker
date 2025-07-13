type BaseComment = {
  id: string;
  text: string;
  type: "task" | "quicktasker" | "wp-user";
  type_id: string;
  author_id: string | null;
  author_type: "quicktasker" | "wp-user";
  author_name: string | null;
  created_at: string;
  subject_name?: string;
  subject_hash?: string;
};

type WPQTComment = BaseComment;

export type { WPQTComment };
