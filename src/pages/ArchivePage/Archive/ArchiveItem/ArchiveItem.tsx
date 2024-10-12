import { useContext } from "@wordpress/element";
import { WPQTCard } from "../../../../components/Card/Card";
import { ArchivedTaskDropdown } from "../../../../components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown";
import { OPEN_EDIT_TASK_MODAL } from "../../../../constants";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Task } from "../../../../types/task";

type Props = {
  task: Task;
};

function ArchiveItem({ task }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  return (
    <WPQTCard
      title={task.name}
      description={task.description}
      dropdown={<ArchivedTaskDropdown task={task} />}
      className="wpqt-cursor-pointer"
      onClick={() => {
        modalDispatch({
          type: OPEN_EDIT_TASK_MODAL,
          payload: { taskToEdit: task },
        });
      }}
    ></WPQTCard>
  );
}

export { ArchiveItem };
