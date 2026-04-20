import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_ADD_PIPELINE,
} from "../../../../constants";
import { usePipelineActions } from "../../../../hooks/actions/usePipelineActions";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { WPQTInput } from "../../../common/Input/Input";
import { WPQTTextarea } from "../../../common/TextArea/TextArea";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
} from "../../WPQTModal";

const PipelineModalContent = () => {
  const { modalDispatch } = useContext(ModalContext);
  const { fetchAndSetPipelineData } = useContext(ActivePipelineContext);
  const { pipelinesDispatch } = useContext(PipelinesContext);
  const { addPipeline } = usePipelineActions();
  const [pipelineName, setPipelineName] = useState("");
  const [pipelineDescription, setPipelineDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const closeModal = () => modalDispatch({ type: CLOSE_PIPELINE_MODAL });

  const savePipeline = async () => {
    try {
      setIsSaving(true);
      await addPipeline(
        pipelineName,
        pipelineDescription,
        (pipeline) => {
          pipelinesDispatch({ type: PIPELINE_ADD_PIPELINE, payload: pipeline });
          fetchAndSetPipelineData(pipeline.id);
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

  return (
    <>
      <WPQTModalFieldSet>
        <WPQTModalField label={__("Name", "quicktasker")}>
          <WPQTInput
            isAutoFocus={true}
            value={pipelineName}
            onChange={(newValue: string) => setPipelineName(newValue)}
            className="wpqt-w-full"
            wrapperClassName="wpqt-w-full"
          />
        </WPQTModalField>
        <WPQTModalField label={__("Description", "quicktasker")}>
          <WPQTTextarea
            rowsCount={3}
            value={pipelineDescription}
            onChange={(newValue: string) => setPipelineDescription(newValue)}
            className="wpqt-w-full"
          />
        </WPQTModalField>
      </WPQTModalFieldSet>
      <WPQTModalFooter
        onSave={savePipeline}
        loading={isSaving}
        saveBtnText={__("Add board", "quicktasker")}
      />
    </>
  );
};

export { PipelineModalContent };
