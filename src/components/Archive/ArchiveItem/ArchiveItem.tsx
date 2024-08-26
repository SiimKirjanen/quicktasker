import { ArchivedTask, Task } from "../../../types/task";

type Props = {
  task: ArchivedTask;
};

function ArchiveItem({ task }: Props) {
  return (
    <div>
      <div>{task.name}</div>
    </div>
  );
}

export { ArchiveItem };
