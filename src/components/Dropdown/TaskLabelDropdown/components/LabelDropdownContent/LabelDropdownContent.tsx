import { memo, useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ADD_LABEL, SET_LABELS } from "../../../../../constants";
import { useLabelActions } from "../../../../../hooks/actions/useLabelActions";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { LabelActionState, SelectionLabel } from "../../../../../types/label";
import { Task } from "../../../../../types/task";
import { LabelCreation } from "../LabelCreation/LabelCreation";
import { LabelEdit } from "../LabelEdit/LabelEdit";
import { LabelSelection } from "../LabelSelection/LabelSelection";

type Props = {
  task: Task;
};
const LabelDropdownContent = memo(({ task }: Props) => {
  const {
    state: { labels, labelActionState },
    labelDispatch,
  } = useContext(LabelContext);
  const [loadingLabels, setLoadingLabels] = useState(true);
  const [creatingLabel, setCreatingLabel] = useState(false);
  const { getPipelineLabels, createPipelineLabel } = useLabelActions();

  const loadLabels = async () => {
    setLoadingLabels(true);
    await getPipelineLabels(task.pipeline_id, (success, labels) => {
      if (success && labels) {
        labelDispatch({ type: SET_LABELS, payload: labels });
      }
    });
    setLoadingLabels(false);
  };

  useEffect(() => {
    loadLabels();
  }, []);

  const getSelectionLabels = (): SelectionLabel[] => {
    const taskAssignedLabels = task.assigned_labels || [];
    return (labels || []).map((label) => ({
      ...label,
      selected: taskAssignedLabels.some(
        (assignedLabel) => assignedLabel.id === label.id,
      ),
    }));
  };

  const onLabelSelected = (labelId: string) => {};
  const onLabelDeSelected = (labelId: string) => {};
  const onLabelCreated = async (name: string, color: string) => {
    setCreatingLabel(true);
    await createPipelineLabel(
      task.pipeline_id,
      name,
      color,
      (success, label) => {
        if (success && label) {
          labelDispatch({ type: ADD_LABEL, payload: label });
        }
      },
    );
    setCreatingLabel(false);
  };

  const renderContent = () => {
    switch (labelActionState) {
      case LabelActionState.SELECTION:
        return (
          <LabelSelection
            title={__("Task label selection", "quicktasker")}
            labels={getSelectionLabels()}
            loading={loadingLabels}
            labelSelected={onLabelSelected}
            labelDeSelection={onLabelDeSelected}
          />
        );
      case LabelActionState.CREATION:
        return (
          <LabelCreation
            labelCreated={onLabelCreated}
            loading={creatingLabel}
          />
        );
      case LabelActionState.EDIT:
        return <LabelEdit />;
      default:
        return null;
    }
  };

  return (
    <div className="wpqt-min-w-56" onClick={(e) => e.stopPropagation()}>
      {renderContent()}
    </div>
  );
});

export { LabelDropdownContent };
