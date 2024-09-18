import { ArchivedTask } from "../../../types/task";
import { ArchivedTaskDropdown } from "../../Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";
import { WPQTCard } from "../../Card/Card";

type Props = {
  task: ArchivedTask;
};

function ArchiveItem({ task }: Props) {
  return (
    <WPQTCard
      title={task.name}
      description={task.description}
      dropdown={<ArchivedTaskDropdown />}
    ></WPQTCard>
  );
}

export { ArchiveItem };
