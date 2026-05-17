import { WPQTAuthorType } from "../../types/comment";

type Props = {
  authorName: string;
  authorType: WPQTAuthorType;
  commentDate: string;
  children?: React.ReactNode;
};

function CommentBox({ authorName, authorType, commentDate, children }: Props) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-border-0 wpqt-border-b wpqt-border-solid wpqt-border-b-gray-200 wpqt-py-3 last:wpqt-border-b-0">
      <div className="wpqt-flex wpqt-gap-1">
        <span className="wpqt-font-semibold">{authorName}</span>
        <span>
          ({authorType === "quicktasker" ? "QuickTasker" : "WP User"})
        </span>
        &bull;
        <span>{commentDate}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export { CommentBox };
