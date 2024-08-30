import { useContext } from "@wordpress/element";
import { ArchivedTask } from "../../../types/task";
import { ArchivedTaskDropdown } from "../../Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";
import { OPEN_ARCHIVE_TASK_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
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
