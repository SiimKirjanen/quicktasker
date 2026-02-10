import { WPQTAuthorType } from "../../types/comment";

type Props = {
  authorName: string;
  authorType: WPQTAuthorType;
  commentDate: string;
  children?: React.ReactNode;
};

function CommentBox({ authorName, authorType, commentDate, children }: Props) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-main-border wpqt-p-3">
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
