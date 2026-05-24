import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CLOSE_TASK_COMMENTS_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTTypes } from "../../../types/enums";
import { CommentsWithVisibility } from "../../Tab/CommentsAndLogs/CommentsWithVisibility";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";
import { MyTasksCommentsContent } from "./MyTasksCommentsContent";

function TaskCommentsModal() {
  const {
    state: { taskCommentsModalOpen, taskCommentsModalSettings },
    modalDispatch,
  } = useContext(ModalContext);

  const taskId = taskCommentsModalSettings.taskId;
  const isPluginAdmin = window.wpqt.isPluginAdmin === "1";

  return (
    <WPQTModal
      modalOpen={taskCommentsModalOpen}
      closeModal={() => modalDispatch({ type: CLOSE_TASK_COMMENTS_MODAL })}
      size="lg"
      testId="task-comments-modal"
    >
      {taskCommentsModalOpen && taskId && (
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
          <WPQTModalTitle>{__("Task comments", "quicktasker")}</WPQTModalTitle>
          {isPluginAdmin ? (
            <CommentsWithVisibility
              subjectId={taskId}
              subjectType={WPQTTypes.Task}
            />
          ) : (
            <MyTasksCommentsContent taskId={taskId} />
          )}
        </div>
      )}
    </WPQTModal>
  );
}

export { TaskCommentsModal };
