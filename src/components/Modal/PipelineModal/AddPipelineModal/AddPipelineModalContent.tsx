import { forwardRef, useImperativeHandle, useState } from "@wordpress/element";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "../../WPQTModal";
import { WPQTInput } from "../../../common/Input/Input";
import { WPQTTextarea } from "../../../common/TextArea/TextArea";

type Props = {
  addPipeline: (name: string, description: string) => void;
  modalSaving: boolean;
  setModalSaving: (value: boolean) => void;
};

const PipelineModalContent = forwardRef(
  ({ addPipeline, modalSaving }: Props, ref) => {
    const [pipelineName, setPipelineName] = useState("");
    const [pipelineDescription, setPipelineDescription] = useState("");

    const savePipeline = () => {
      addPipeline(pipelineName, pipelineDescription);
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
        <WPQTModalTitle>Add board</WPQTModalTitle>
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
          saveBtnText={modalSaving ? "Saving..." : "Add board"}
        />
      </>
    );
  },
);

export { PipelineModalContent };
