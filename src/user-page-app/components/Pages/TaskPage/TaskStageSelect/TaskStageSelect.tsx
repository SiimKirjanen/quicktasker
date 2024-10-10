import { useContext, useState } from "@wordpress/element";
import { Task } from "../../../../../types/task";
import { UserPageTaskContext } from "../../../../providers/UserPageTaskContextProvider";
import { UserPageAppContext } from "../../../../providers/UserPageAppContextProvider";
import { StageSelectionModal } from "../../../Modal/StageSelectionModal/StageSelectionModal";
import { WPQTButton } from "../../../../../components/common/Button/Button";
import { __, sprintf } from "@wordpress/i18n";

type Props = {
  task: Task | null;
};
function TaskStageSelect({ task }: Props) {
  const {
    state: { taskStages },
  } = useContext(UserPageTaskContext);
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const currentTaskStage = taskStages.find(
    (stage) => stage.id === task?.stage_id,
  );

  if (task === null) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center">
      <h3>
        {sprintf(
          __("Current task stage is %s", "quicktasker"),
          currentTaskStage?.name,
        )}
      </h3>
      <WPQTButton
        btnText={__("Change stage", "quicktasker")}
        onClick={() => setSelectionModalOpen(true)}
      />

      <StageSelectionModal
        stages={taskStages}
        task={task}
        pageHash={pageHash}
        open={selectionModalOpen}
        onClose={() => setSelectionModalOpen(false)}
      />
    </div>
  );
}

export { TaskStageSelect };
