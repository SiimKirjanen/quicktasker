import { memo, useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_LABELS } from "../../../../../constants";
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
  const { getPipelineLabels } = useLabelActions();

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

  const onLabelSelection = (labelId: string) => {};
  const onLabelDeSelection = (labelId: string) => {};

  if (labelActionState == LabelActionState.SELECTION) {
    return (
      <LabelSelection
        title={__("Task label selection", "quicktasker")}
        labels={getSelectionLabels()}
        loading={loadingLabels}
        labelSelected={onLabelSelection}
        labelDeSelection={onLabelDeSelection}
      />
    );
  }
  if (labelActionState == LabelActionState.CREATION) {
    return <LabelCreation />;
  }
  if (labelActionState == LabelActionState.EDIT) {
    return <LabelEdit />;
  }

  return null;
});

export { LabelDropdownContent };
