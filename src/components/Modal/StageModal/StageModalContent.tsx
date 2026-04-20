import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_STAGE_MODAL,
  PIPELINE_ADD_STAGE,
  PIPELINE_EDIT_STAGE,
} from "../../../constants";
import { useStageActions } from "../../../hooks/actions/useStageActions";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Stage } from "../../../types/stage";
import { convertStageFromServer } from "../../../utils/stage";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "../WPQTModal";

const StageModalContent = () => {
  const {
    state: { stageToEdit, targetPipelineId },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(ActivePipelineContext);
  const { editStage, addStage } = useStageActions();
  const [stageName, setStageName] = useState("");
  const [stageDescription, setStageDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const editingStage = !!stageToEdit;

  useEffect(() => {
    if (stageToEdit) {
      setStageName(stageToEdit.name);
      setStageDescription(stageToEdit.description);
    }
  }, [stageToEdit]);

  const closeModal = () => modalDispatch({ type: CLOSE_STAGE_MODAL });

  const onAddStage = async () => {
    try {
      setIsSaving(true);
      await addStage(targetPipelineId, stageName, stageDescription, (stage) => {
        dispatch({
          type: PIPELINE_ADD_STAGE,
          payload: { stage: convertStageFromServer({ ...stage, tasks: [] }) },
        });
        closeModal();
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const onEditStage = async (stage: Stage) => {
    try {
      setIsSaving(true);
      await editStage(
        stage,
        (updatedStage) => {
          dispatch({
            type: PIPELINE_EDIT_STAGE,
            payload: convertStageFromServer(updatedStage),
          });
          closeModal();
        },
        (error) => {
          console.error(error);
        },
      );
    } finally {
      setIsSaving(false);
    }
  };

  const saveStage = () => {
    editingStage
      ? onEditStage({
          ...stageToEdit,
          name: stageName,
          description: stageDescription,
        })
      : onAddStage();
  };

  return (
    <>
      <WPQTModalTitle>
        {editingStage
          ? __("Edit Stage", "quicktasker")
          : __("Add Stage", "quicktasker")}
      </WPQTModalTitle>
      <WPQTModalFieldSet>
        <WPQTModalField label={__("Name", "quicktasker")}>
          <WPQTInput
            isAutoFocus={true}
            value={stageName}
            onChange={(newValue: string) => setStageName(newValue)}
            className="wpqt-w-full"
            wrapperClassName="wpqt-w-full"
          />
        </WPQTModalField>
        <WPQTModalField label={__("Description", "quicktasker")}>
          <WPQTTextarea
            rowsCount={3}
            value={stageDescription}
            onChange={(newValue: string) => setStageDescription(newValue)}
            className="!wpqt-w-full"
          />
        </WPQTModalField>
      </WPQTModalFieldSet>
      <WPQTModalFooter
        onSave={saveStage}
        loading={isSaving}
        saveBtnText={
          editingStage
            ? __("Save", "quicktasker")
            : __("Add stage", "quicktasker")
        }
      />
    </>
  );
};

export { StageModalContent };
