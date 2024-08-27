import { Task } from "../../../types/task";
import { WPQTTabs } from "../WPQTTabs";
import { CommentsTabContent } from "./CommentsTabContent";
import { LogsTabContent } from "./LogsTabContent";

type Props = {
  task: Task;
};
function TaskModalTabs({ task }: Props) {
  const tabs = ["Comments", "Logs"];

  return (
    <WPQTTabs
      tabs={tabs}
      tabsContent={[
        <CommentsTabContent taskId={task.id} />,
        <LogsTabContent taskId={task.id} />,
      ]}
    />
  );
}

export { TaskModalTabs };
