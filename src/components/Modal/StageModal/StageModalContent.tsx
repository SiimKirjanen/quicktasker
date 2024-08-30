import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Stage } from "../../../types/stage";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "../WPQTModal";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";

type Props = {
  editStage: (stage: Stage) => void;
  addStage: (name: string, description: string) => void;
  stageModalSaving: boolean;
  stageTaskModalSaving: (value: boolean) => void;
};

const StageModalContent = forwardRef(
  ({ editStage, addStage, stageModalSaving }: Props, ref) => {
    const {
      state: { stageToEdit },
    } = useContext(ModalContext);
    const [stageName, setStageName] = useState("");
    const [stageDescription, setStageDescription] = useState("");
    const editingStage = !!stageToEdit;

    useEffect(() => {
      if (stageToEdit) {
        setStageName(stageToEdit.name);
        setStageDescription(stageToEdit.description);
      }
    }, [stageToEdit]);

    const saveStage = () => {
      editingStage
        ? editStage({
            ...stageToEdit,
            name: stageName,
            description: stageDescription,
          })
        : addStage(stageName, stageDescription);
    };

    const clearContent = () => {
      setStageName("");
      setStageDescription("");
    };

    useImperativeHandle(ref, () => ({
      clearContent,
    }));

    return (
      <>
        <WPQTModalTitle>
          {editingStage ? "Edit task" : "Add Stage"}
        </WPQTModalTitle>
        <WPQTModalFieldSet>
          <WPQTModalField label="Name">
            <WPQTInput
              isAutoFocus={true}
              value={stageName}
              onChange={(newValue: string) => setStageName(newValue)}
            />
          </WPQTModalField>
          <WPQTModalField label="Description">
            <WPQTTextarea
              rowsCount={3}
              value={stageDescription}
              onChange={(newValue: string) => setStageDescription(newValue)}
            />
          </WPQTModalField>
        </WPQTModalFieldSet>
        <WPQTModalFooter
          onSave={saveStage}
          saveBtnText={
            stageModalSaving
              ? "Saving..."
              : editingStage
                ? "Edit stage"
                : "Add stage"
          }
        />
      </>
    );
  },
);

export { StageModalContent };
