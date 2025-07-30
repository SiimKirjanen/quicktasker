import { TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_REMOVE_ACTIVE_PIPELINE,
  PIPELINE_REMOVE_PIPELINE,
  PIPELINE_SET_PRIMARY,
} from "../../../../constants";
import { usePipelineActions } from "../../../../hooks/actions/usePipelineActions";
import { useLoadingStates } from "../../../../hooks/useLoadingStates";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { CustomFieldEntityType } from "../../../../types/custom-field";
import { PipelineFromServer } from "../../../../types/pipeline";
import { WPQTIconButton } from "../../../common/Button/Button";
import { AutoSaveInput } from "../../../common/Input/AutoSaveInput/AutoSaveInput";
import { AutoSaveTextarea } from "../../../common/Input/AutoSaveTextarea/AutoSaveTextarea";
import { CustomFieldsInModalWrap } from "../../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap";
import { WPQTConfirmTooltip } from "../../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { WPQTModalField, WPQTModalFieldSet } from "../../WPQTModal";

type Props = {
  onPipelineEditSuccess: (pipeline: PipelineFromServer) => void;
};

const EditPipelineModalContent = ({ onPipelineEditSuccess }: Props) => {
  const {
    state: { pipelineToEdit },
    modalDispatch,
  } = useContext(ModalContext);
  const { fetchAndSetPipelineData, dispatch } = useContext(
    ActivePipelineContext,
  );
  const { pipelinesDispatch } = useContext(PipelinesContext);
  const { editPipeline } = usePipelineActions();
  const { deletePipeline } = usePipelineActions();
  const { loading1: isDeletingBoard, setLoading1: setIsDeletingBoard } =
    useLoadingStates();

  const onDeletePipeline = () => {
    if (!pipelineToEdit) return;
    setIsDeletingBoard(true);
    deletePipeline(pipelineToEdit.id, (removedPipelineId, pipelineIdToLoad) => {
      modalDispatch({ type: CLOSE_PIPELINE_MODAL });
      setIsDeletingBoard(false);
      toast.success(__("Board deleted", "quicktasker"));
      pipelinesDispatch({
        type: PIPELINE_REMOVE_PIPELINE,
        payload: removedPipelineId,
      });
      if (pipelineIdToLoad !== null) {
        pipelinesDispatch({
          type: PIPELINE_SET_PRIMARY,
          payload: pipelineIdToLoad,
        });
        fetchAndSetPipelineData(pipelineIdToLoad);
      } else {
        dispatch({ type: PIPELINE_REMOVE_ACTIVE_PIPELINE });
      }
    });
  };

  if (!pipelineToEdit) return null;

  return (
    <>
      <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]">
        <div className="wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-3">
          <div className="wpqt-mb-5 wpqt-grid wpqt-grid-cols-1 wpqt-gap-6 md:wpqt-grid-cols-[1fr_0.7fr]">
            <WPQTModalFieldSet>
              <WPQTModalField label={__("Name", "quicktasker")}>
                <AutoSaveInput
                  isAutoFocus={true}
                  value={pipelineToEdit.name}
                  wrapperClassName="wpqt-w-full"
                  className="wpqt-w-full"
                  onChange={async (value) => {
                    const { success, pipeline: updatedPipeline } =
                      await editPipeline(pipelineToEdit.id, { name: value });
                    if (success && updatedPipeline) {
                      onPipelineEditSuccess(updatedPipeline);
                    }
                  }}
                />
              </WPQTModalField>
              <WPQTModalField label={__("Description", "quicktasker")}>
                <AutoSaveTextarea
                  value={pipelineToEdit.description || ""}
                  className="wpqt-w-full"
                  onChange={async (value) => {
                    const { success, pipeline: updatedPipeline } =
                      await editPipeline(pipelineToEdit.id, {
                        description: value,
                      });
                    if (success && updatedPipeline) {
                      onPipelineEditSuccess(updatedPipeline);
                    }
                  }}
                />
              </WPQTModalField>
            </WPQTModalFieldSet>
            <CustomFieldsInModalWrap
              entityId={pipelineToEdit.id}
              entityType={CustomFieldEntityType.Pipeline}
            />
          </div>
        </div>
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
          <WPQTConfirmTooltip
            onConfirm={onDeletePipeline}
            confirmMessage={__(
              "Are you sure you want to delete this board?",
              "quicktasker",
            )}
          >
            {({ onClick }) => (
              <WPQTIconButton
                icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
                loading={isDeletingBoard}
                text={__("Delete board", "quicktasker")}
                onClick={onClick}
              />
            )}
          </WPQTConfirmTooltip>
        </div>
      </div>
    </>
  );
};

export { EditPipelineModalContent };
