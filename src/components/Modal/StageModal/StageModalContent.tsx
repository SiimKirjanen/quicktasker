import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { clsx } from "clsx";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Stage } from "../../../types/stage";
import { WPQTModalTitle } from "../WPQTModal";

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
        <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
          <Field className="wpqt-mb-3">
            <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
              Name
            </Label>
            <Input
              className={clsx(
                "wpqt-border-1 wpqt-block wpqt-w-full wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
                "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25",
              )}
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
            />
          </Field>
          <Field>
            <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
              Description
            </Label>
            <Textarea
              className={clsx(
                "wpqt-border-1 wpqt-block wpqt-w-full wpqt-resize-none wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
                "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25",
              )}
              rows={3}
              value={stageDescription}
              onChange={(e) => setStageDescription(e.target.value)}
            />
          </Field>
        </Fieldset>
        <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
          <Button
            className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[open]:wpqt-bg-gray-700 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white"
            onClick={saveStage}
          >
            {stageModalSaving
              ? "Saving..."
              : editingStage
                ? "Edit stage"
                : "Add stage"}
          </Button>
        </div>
      </>
    );
  },
);

export { StageModalContent };
