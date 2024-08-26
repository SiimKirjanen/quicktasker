import { ArchivedTask } from "../../../types/task";
import { ArchivedTaskDropdown } from "../../Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";

type Props = {
  task: ArchivedTask;
};

function ArchiveItem({ task }: Props) {
  const openArchivedTaskModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {};

  return (
    <div
      className="wpqt-relative wpqt-flex wpqt-basis-[200px] wpqt-cursor-pointer wpqt-flex-col wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-2"
      onClick={openArchivedTaskModal}
    >
      <div className="wpqt-pr-6">
        {task.name}
        <div className="wpqt-absolute wpqt-right-2 wpqt-top-1">
          <ArchivedTaskDropdown />
        </div>
      </div>
      {task.description && <div>{task.description}</div>}
    </div>
  );
}

export { ArchiveItem };
