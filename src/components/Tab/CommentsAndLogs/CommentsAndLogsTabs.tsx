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
  const isTask = subject === "task";
  const logsType = isTask ? WPQTTypes.Task : WPQTTypes.User;
  const commentsType = isTask ? WPQTTypes.Task : UserTypes.QUICKTASKER;

  const tabs = [
    ...(isTask ? [] : [{ name: __("Logs", "quicktasker") }]),
    { name: __("Private comments", "quicktasker") },
    { name: __("Public comments", "quicktasker") },
  ];

  const tabsContent = [
    ...(isTask
      ? []
      : [
          <LogsTabContent
            subjectId={subjectId}
            subjectType={logsType}
            key="logs"
          />,
        ]),
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

export { CommentsAndLogsTabs };
