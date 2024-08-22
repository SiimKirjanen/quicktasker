import {
  Button,
  Checkbox,
  DialogTitle,
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
import Switch from "react-switch";
import { Pipeline } from "../../../types/pipeline";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { clsx } from "clsx";
import { CheckIcon } from "@heroicons/react/24/solid";

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
    const [isPrimary, setIsPrimary] = useState(false);
    const editingPipeline = !!pipelineToEdit;

    useEffect(() => {
      if (pipelineToEdit) {
        setPipelineName(pipelineToEdit.name);
        setPipelineDescription(pipelineToEdit.description || "");
        setIsPrimary(pipelineToEdit.is_primary);
      }
    }, [pipelineToEdit]);

    const savePipeline = () => {
      editingPipeline
        ? editPipeline({
            ...pipelineToEdit,
            name: pipelineName,
            description: pipelineDescription,
            is_primary: isPrimary,
          })
        : addPipeline(pipelineName, pipelineDescription);
    };

    const clearContent = () => {
      setPipelineName("");
      setPipelineDescription("");
      setIsPrimary(false);
    };

    useImperativeHandle(ref, () => ({
      clearContent,
    }));

    return (
      <>
        <DialogTitle
          as="div"
          className="wpqt-text-base/7 wpqt-font-medium wpqt-text-black"
        >
          {editingPipeline ? "Edit board" : "Add board"}
        </DialogTitle>
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
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
            />
          </Field>
          <Field className="wpqt-mb-3">
            <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
              Description
            </Label>
            <Textarea
              className={clsx(
                "wpqt-border-1 wpqt-block wpqt-w-full wpqt-resize-none wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
                "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25",
              )}
              rows={3}
              value={pipelineDescription}
              onChange={(e) => setPipelineDescription(e.target.value)}
            />
          </Field>

          <Field>
            <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
              Mark as primary board
            </Label>
            <Checkbox
              checked={isPrimary}
              onChange={setIsPrimary}
              className="wpqt-group wpqt-block wpqt-size-4 wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-gray-500 data-[checked]:wpqt-bg-green-500"
            >
              <svg
                className="wpqt-stroke-white wpqt-opacity-0 group-data-[checked]:wpqt-opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
          </Field>
        </Fieldset>
        <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
          <Button
            className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[open]:wpqt-bg-gray-700 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white"
            onClick={savePipeline}
          >
            {modalSaving
              ? "Saving..."
              : editingPipeline
                ? "Edit board"
                : "Add board"}
          </Button>
        </div>
      </>
    );
  },
);

export { PipelineModalContent };
