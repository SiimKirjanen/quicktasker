import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CLOSE_MOVE_TASK_MODAL, PIPELINE_MOVE_TASK } from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { useActivePipeline } from "../../../hooks/useActivePipeline";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTModal } from "../WPQTModal";

function MoveTaskModal() {
  const {
    state: { moveTaskModalOpen, taskToEdit },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(ActivePipelineContext);
  const {
    getActivePipelineStages,
    getActivePipelinStageTasksLength,
    getTaskStage,
    getTaskOrderInStage,
  } = useActivePipeline();
  const { moveTask } = useTaskActions();
  const [order, setOrder] = useState(0);
  const [stageId, setStageId] = useState("");
  const [loading, setLoading] = useState(false);
  const stageTasksLenght = getActivePipelinStageTasksLength(stageId);
  const orderOptions = Array.from({ length: stageTasksLenght }, (_, index) => ({
    value: index.toString(),
    label: (index + 1).toString(),
  }));
  const stageOptions = getActivePipelineStages().map((stage) => ({
    value: stage.id,
    label: stage.name,
  }));
  const closeModal = () => {
    modalDispatch({ type: CLOSE_MOVE_TASK_MODAL });
  };

  const handleApply = async () => {
    if (!taskToEdit) {
      return;
    }
    const taskStage = getTaskStage(taskToEdit.id);
    const taskOrderInStage = getTaskOrderInStage(taskToEdit.id);

    if (!taskStage || taskOrderInStage === null) {
      return;
    }

    setLoading(true);
    await moveTask(taskToEdit.id, stageId, order, (isCompleted) => {
      if (isCompleted) {
        dispatch({
          type: PIPELINE_MOVE_TASK,
          payload: {
            source: {
              droppableId: taskStage.id,
              index: taskOrderInStage,
            },
            destination: {
              droppableId: stageId,
              index: order,
            },
          },
        });
        closeModal();
      }
    });
    setLoading(false);
  };

  const changeStage = (stageId: string) => {
    setStageId(stageId);
    setOrder(0);
  };

  useEffect(() => {
    if (taskToEdit) {
      const taskStage = getTaskStage(taskToEdit.id);
      const taskOrderInStage = getTaskOrderInStage(taskToEdit.id);

      if (taskStage && taskOrderInStage !== null) {
        setStageId(taskStage.id);
        setOrder(taskOrderInStage);
      }
    }
  }, [taskToEdit]);

  return (
    <WPQTModal modalOpen={moveTaskModalOpen} closeModal={closeModal}>
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
        <h2>{__("Change task location on board", "quicktasker")}</h2>

        <label htmlFor="move-task-stage-selection">
          {__("Select stage", "quicktasker")}
        </label>
        <WPQTSelect
          id="move-task-stage-selection"
          allSelector={false}
          selectedOptionValue={stageId}
          options={stageOptions}
          onSelectionChange={changeStage}
        />

        <label htmlFor="move-task-order-selection">
          {__("Select order", "quicktasker")}
        </label>
        <WPQTSelect
          id="move-task-order-selection"
          allSelector={false}
          selectedOptionValue={String(order)}
          options={orderOptions}
          onSelectionChange={(value) => setOrder(Number(value))}
        />

        <WPQTButton
          btnText={__("Apply", "quicktasker")}
          loading={loading}
          onClick={handleApply}
        />
      </div>
    </WPQTModal>
  );
}

export { MoveTaskModal };
