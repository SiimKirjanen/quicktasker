import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { Pipeline } from "../../../../types/pipeline";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "../../WPQTModal";
import { WPQTInput } from "../../../common/Input/Input";
import { WPQTTextarea } from "../../../common/TextArea/TextArea";

type Props = {
  editPipeline: (pipeline: Pipeline) => void;
  modalSaving: boolean;
  setModalSaving: (value: boolean) => void;
};

const PipelineModalContent = forwardRef(
  ({ editPipeline, modalSaving }: Props, ref) => {
    const {
      state: { pipelineToEdit },
    } = useContext(ModalContext);
    const [pipelineName, setPipelineName] = useState("");
    const [pipelineDescription, setPipelineDescription] = useState("");

    useEffect(() => {
      if (pipelineToEdit) {
        setPipelineName(pipelineToEdit.name);
        setPipelineDescription(pipelineToEdit.description || "");
      }
    }, [pipelineToEdit]);

    const savePipeline = () => {
      if (pipelineToEdit) {
        editPipeline({
          ...pipelineToEdit,
          name: pipelineName,
          description: pipelineDescription,
        });
      }
    };

    const clearContent = () => {
      setPipelineName("");
      setPipelineDescription("");
    };

    useImperativeHandle(ref, () => ({
      clearContent,
    }));

    return (
      <>
        <WPQTModalTitle>Edit board</WPQTModalTitle>
        <WPQTModalFieldSet>
          <WPQTModalField label="Name">
            <WPQTInput
              isAutoFocus={true}
              value={pipelineName}
              onChange={(newValue: string) => setPipelineName(newValue)}
            />
          </WPQTModalField>
          <WPQTModalField label="Description">
            <WPQTTextarea
              rowsCount={3}
              value={pipelineDescription}
              onChange={(newValue: string) => setPipelineDescription(newValue)}
            />
          </WPQTModalField>
        </WPQTModalFieldSet>
        <WPQTModalFooter
          onSave={savePipeline}
          saveBtnText={modalSaving ? "Saving..." : "Edit board"}
        />
      </>
    );
  },
);

export { PipelineModalContent };
