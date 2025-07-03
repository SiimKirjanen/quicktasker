import { ArrowUturnUpIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_TASK_RESTORE_MODAL,
  REMOVE_ARCHIVED_TASK,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { usePipelines } from "../../../hooks/usePipelines";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTLabel } from "../../common/Label/WPQTLabel";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTModal } from "../WPQTModal";

function TaskRestoreModal() {
  const {
    state: { taskRestoreModalOpen, taskRestoreModalSettings },
    modalDispatch,
  } = useContext(ModalContext);
  const { archiveDispatch } = useContext(ArchiveContext);
  const { pipelines } = usePipelines();
  const { restoreArchivedTask } = useTaskActions();
  const pipelineOptions = useMemo(
    () =>
      pipelines.map((pipeline) => ({
        value: pipeline.id,
        label: pipeline.name,
      })),
    [pipelines],
  );
  const [selectedPipelineId, setSelectedPipelineId] = useState("");
  const [restoringTast, setRestoringTask] = useState(false);

  useEffect(() => {
    const targetPipelineId =
      taskRestoreModalSettings?.taskToRestore?.pipeline_id || "";

    if (targetPipelineId) {
      setSelectedPipelineId(targetPipelineId);
    } else {
      if (pipelineOptions.length > 0) {
        setSelectedPipelineId(pipelineOptions[0].value);
      }
    }
  }, [taskRestoreModalSettings, pipelineOptions]);

  const handleRestoreTask = async () => {
    const taskToRestore = taskRestoreModalSettings?.taskToRestore;

    if (!taskToRestore || !selectedPipelineId || restoringTast) {
      return;
    }

    setRestoringTask(true);
    await restoreArchivedTask(taskToRestore.id, selectedPipelineId, (args) => {
      if (args.success) {
        archiveDispatch({
          type: REMOVE_ARCHIVED_TASK,
          payload: taskToRestore.id,
        });
        modalDispatch({ type: CLOSE_TASK_RESTORE_MODAL });
      }
    });

    /*   */
    setRestoringTask(false);
  };
  console.log(selectedPipelineId);
  console.log(taskRestoreModalSettings.taskToRestore);

  return (
    <WPQTModal
      modalOpen={taskRestoreModalOpen}
      closeModal={() => {
        modalDispatch({ type: CLOSE_TASK_RESTORE_MODAL });
      }}
    >
      <div>
        <div className="wpqt-flex wpqt-flex-col wpqt-items-start">
          <WPQTLabel labelFor="task-restore-pipeline-select">
            {__("Select the board to restore to", "quicktasker")}
          </WPQTLabel>
          <WPQTSelect
            options={pipelineOptions}
            className="wpqt-mb-2"
            allSelector={false}
            selectedOptionValue={selectedPipelineId}
            id="task-restore-pipeline-select"
            onSelectionChange={(selectedValue) => {
              console.log("what");
              setSelectedPipelineId(selectedValue);
            }}
          />

          <div className="wpqt-flex wpqt-justify-end wpqt-w-full">
            <WPQTIconButton
              icon={
                <ArrowUturnUpIcon className="wpqt-icon-green wpqt-size-4" />
              }
              loading={restoringTast}
              text={__("Restore", "quicktasker")}
              onClick={handleRestoreTask}
            />
          </div>
        </div>
      </div>
    </WPQTModal>
  );
}

export { TaskRestoreModal };
