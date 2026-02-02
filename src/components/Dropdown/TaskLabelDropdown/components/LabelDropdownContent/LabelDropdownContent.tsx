import { memo, useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  ADD_LABEL,
  ADD_LABEL_ARCHIVED_TASK,
  EDIT_LABEL,
  PIPELINE_ADD_LABEL_TO_TASK,
  PIPELINE_EDIT_LABEL,
  PIPELINE_REMOVE_LABEL,
  PIPELINE_REMOVE_LABEL_FROM_TASK,
  REMOVE_LABEL,
  REMOVE_LABEL_ARCHIVED_TASK,
  RESET_LABEL_CONTEXT,
  SET_LABEL_ACTION_STATE_SELECTION,
  SET_LABELS,
} from "../../../../../constants";
import { useLabelActions } from "../../../../../hooks/actions/useLabelActions";
import { ActivePipelineContext } from "../../../../../providers/ActivePipelineContextProvider";
import { ArchiveContext } from "../../../../../providers/ArchiveContextProvider";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import {
  Label,
  LabelActionState,
  SelectionLabel,
} from "../../../../../types/label";
import { Task } from "../../../../../types/task";
import { LabelCreation } from "../LabelCreation/LabelCreation";
import { LabelEdit } from "../LabelEdit/LabelEdit";
import { LabelSelection } from "../LabelSelection/LabelSelection";

type Props = {
  task: Task;
  labelSelected: (label: Label) => void;
  labelDeselected: (labelId: string) => void;
  labelDeleted: (labelId: string) => void;
};
const LabelDropdownContent = memo(
  ({ task, labelSelected, labelDeselected, labelDeleted }: Props) => {
    const {
      state: { labels, labelActionState, labelToEdit },
      labelDispatch,
    } = useContext(LabelContext);
    const { archiveDispatch } = useContext(ArchiveContext);
    const { dispatch } = useContext(ActivePipelineContext);
    const [loadingLabels, setLoadingLabels] = useState(true);
    const [creatingLabel, setCreatingLabel] = useState(false);
    const {
      getPipelineLabels,
      createPipelineLabel,
      assignLabelToTask,
      usassignLabelFromTask,
      editLabel,
      deleteLabel,
    } = useLabelActions();

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

      return () => {
        labelDispatch({ type: RESET_LABEL_CONTEXT });
      };
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

    const onLabelSelected = async (labelId: string) => {
      await assignLabelToTask(
        task.pipeline_id,
        task.id,
        labelId,
        (success, label) => {
          if (success && label) {
            dispatch({
              type: PIPELINE_ADD_LABEL_TO_TASK,
              payload: { taskId: task.id, label },
            });
            archiveDispatch({
              type: ADD_LABEL_ARCHIVED_TASK,
              payload: { taskId: task.id, label },
            });
            labelSelected(label);
          }
        },
      );
    };
    const onLabelDeSelected = async (labelId: string) => {
      await usassignLabelFromTask(
        task.pipeline_id,
        task.id,
        labelId,
        (success) => {
          if (success) {
            dispatch({
              type: PIPELINE_REMOVE_LABEL_FROM_TASK,
              payload: { taskId: task.id, labelId },
            });
            archiveDispatch({
              type: REMOVE_LABEL_ARCHIVED_TASK,
              payload: { taskId: task.id, labelId },
            });
            labelDeselected(labelId);
          }
        },
      );
    };
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

    const onEditLabel = async (label: Label) => {
      await editLabel(task.pipeline_id, label, (success, label) => {
        if (success && label) {
          labelDispatch({ type: EDIT_LABEL, payload: label });
          dispatch({
            type: PIPELINE_EDIT_LABEL,
            payload: {
              label,
            },
          });
        }
      });
    };

    const onDeleteLabel = async (labelId: string) => {
      await deleteLabel(task.pipeline_id, labelId, (success, label) => {
        if (success && label) {
          labelDispatch({ type: SET_LABEL_ACTION_STATE_SELECTION });
          labelDispatch({ type: REMOVE_LABEL, payload: label });
          dispatch({ type: PIPELINE_REMOVE_LABEL, payload: labelId });
          labelDeleted(labelId);
        }
      });
    };

    const renderContent = () => {
      switch (labelActionState) {
        case LabelActionState.SELECTION:
          return (
            <LabelSelection
              title={__("Label selection", "quicktasker")}
              labels={getSelectionLabels()}
              loading={loadingLabels}
              labelSelected={onLabelSelected}
              labelDeSelection={onLabelDeSelected}
              deleteLabe={onDeleteLabel}
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
          return (
            <LabelEdit
              labelToEdit={labelToEdit}
              editLabel={onEditLabel}
              closeEdit={() => {
                labelDispatch({ type: SET_LABEL_ACTION_STATE_SELECTION });
              }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div
        className="wpqt-min-w-56 wpqt-flex wpqt-flex-col wpqt-gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    );
  },
);

export { LabelDropdownContent };
