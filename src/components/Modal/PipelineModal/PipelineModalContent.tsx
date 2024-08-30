import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { Pipeline } from "../../../types/pipeline";
import { ModalContext } from "../../../providers/ModalContextProvider";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "../WPQTModal";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";

type Props = {
  editPipeline: (pipeline: Pipeline) => void;
  addPipeline: (name: string, description: string) => void;
  modalSaving: boolean;
  setModalSaving: (value: boolean) => void;
};

const PipelineModalContent = forwardRef(
  ({ editPipeline, addPipeline, modalSaving }: Props, ref) => {
    const {
      state: { pipelineToEdit },
    } = useContext(ModalContext);
    const [pipelineName, setPipelineName] = useState("");
    const [pipelineDescription, setPipelineDescription] = useState("");
    const editingPipeline = !!pipelineToEdit;

    useEffect(() => {
      if (pipelineToEdit) {
        setPipelineName(pipelineToEdit.name);
        setPipelineDescription(pipelineToEdit.description || "");
      }
    }, [pipelineToEdit]);

    const savePipeline = () => {
      editingPipeline
        ? editPipeline({
            ...pipelineToEdit,
            name: pipelineName,
            description: pipelineDescription,
          })
        : addPipeline(pipelineName, pipelineDescription);
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
        <WPQTModalTitle>
          {editingPipeline ? "Edit board" : "Add board"}
        </WPQTModalTitle>
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
          saveBtnText={
            modalSaving
              ? "Saving..."
              : editingPipeline
                ? "Edit board"
                : "Add board"
          }
        />
      </>
    );
  },
);

export { PipelineModalContent };
