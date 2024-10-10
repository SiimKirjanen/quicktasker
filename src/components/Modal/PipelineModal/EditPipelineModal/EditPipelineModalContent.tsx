import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Pipeline } from "../../../../types/pipeline";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
} from "../../WPQTModal";
import { WPQTInput } from "../../../common/Input/Input";
import { WPQTTextarea } from "../../../common/TextArea/TextArea";
import { CustomFieldEntityType } from "../../../../types/custom-field";
import { CustomFieldsInModalWrap } from "../../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap";

type Props = {
  editPipeline: (pipeline: Pipeline) => void;
  modalSaving: boolean;
  setModalSaving: (value: boolean) => void;
};

const EditPipelineModalContent = forwardRef(
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

    if (!pipelineToEdit) return null;

    return (
      <>
        <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-3 md:wpqt-grid-cols-[auto_1fr]">
          <div>
            <WPQTModalFieldSet>
              <WPQTModalField label={__("Name", "quicktasker")}>
                <WPQTInput
                  isAutoFocus={true}
                  value={pipelineName}
                  onChange={(newValue: string) => setPipelineName(newValue)}
                />
              </WPQTModalField>
              <WPQTModalField label={__("Description", "quicktasker")}>
                <WPQTTextarea
                  rowsCount={3}
                  value={pipelineDescription}
                  onChange={(newValue: string) =>
                    setPipelineDescription(newValue)
                  }
                />
              </WPQTModalField>
            </WPQTModalFieldSet>
          </div>

          <CustomFieldsInModalWrap
            entityId={pipelineToEdit.id}
            entityType={CustomFieldEntityType.Pipeline}
          />
        </div>
        <WPQTModalFooter
          onSave={savePipeline}
          saveBtnText={
            modalSaving
              ? __("Saving...", "quicktasker")
              : __("Edit board", "quicktasker")
          }
        />
      </>
    );
  },
);

export { EditPipelineModalContent };
