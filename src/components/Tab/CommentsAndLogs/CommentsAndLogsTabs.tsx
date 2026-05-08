import { __ } from "@wordpress/i18n";
import { WPQTTypes } from "../../../types/enums";
import { UserTypes } from "../../../types/user";
import { WPQTTabs } from "../WPQTTabs";
import { CommentsTabContent } from "./CommentsTabContent";
import { LogsTabContent } from "./LogsTabContent";

type Props = {
  subjectId: string;
  subject: "task" | "user";
};

function CommentsAndLogsTabs({ subjectId, subject }: Props) {
  const logsType = subject === "task" ? WPQTTypes.Task : WPQTTypes.User;
  const commentsType =
    subject === "task" ? WPQTTypes.Task : UserTypes.QUICKTASKER;

  const tabs = [
    { name: __("Logs", "quicktasker") },
    { name: __("Private comments", "quicktasker") },
    { name: __("Public comments", "quicktasker") },
  ];

  return (
    <WPQTTabs
      tabs={tabs}
      tabsContent={[
        <LogsTabContent subjectId={subjectId} subjectType={logsType} key={1} />,
        <CommentsTabContent
          subjectId={subjectId}
          subjectType={commentsType}
          isPrivate={true}
          key={2}
        />,
        <CommentsTabContent
          subjectId={subjectId}
          subjectType={commentsType}
          isPrivate={false}
          key={3}
        />,
      ]}
    />
  );
}

export { CommentsAndLogsTabs };
