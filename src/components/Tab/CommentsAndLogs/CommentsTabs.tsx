import { __ } from "@wordpress/i18n";
import { WPQTTypes } from "../../../types/enums";
import { UserTypes } from "../../../types/user";
import { WPQTTabs } from "../WPQTTabs";
import { CommentsTabContent } from "./CommentsTabContent";

type Props = {
  subjectId: string;
  subject: "task" | "user";
};

function CommentsTabs({ subjectId, subject }: Props) {
  const commentsType =
    subject === "task" ? WPQTTypes.Task : UserTypes.QUICKTASKER;

  const tabs = [
    { name: __("Private comments", "quicktasker") },
    { name: __("Public comments", "quicktasker") },
  ];

  const tabsContent = [
    <CommentsTabContent
      subjectId={subjectId}
      subjectType={commentsType}
      isPrivate={true}
      key="private"
    />,
    <CommentsTabContent
      subjectId={subjectId}
      subjectType={commentsType}
      isPrivate={false}
      key="public"
    />,
  ];

  return <WPQTTabs tabs={tabs} tabsContent={tabsContent} />;
}

export { CommentsTabs };
