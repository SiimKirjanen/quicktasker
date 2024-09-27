import { WPQTCard } from "../../../../components/Card/Card";
import { ArchivedTaskDropdown } from "../../../../components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";
import { ArchivedTask } from "../../../../types/task";

type Props = {
  task: ArchivedTask;
};

function ArchiveItem({ task }: Props) {
  return (
    <WPQTCard
      title={task.name}
      description={task.description}
      dropdown={<ArchivedTaskDropdown task={task} />}
    ></WPQTCard>
  );
}

export { ArchiveItem };
