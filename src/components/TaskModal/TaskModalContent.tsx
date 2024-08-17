import {
  Fieldset,
  Field,
  Input,
  Label,
  Textarea,
  Button,
} from "@headlessui/react";
import { clsx } from "clsx";

type Props = {
  taskName: string;
  setTaskName: (value: string) => void;
  taskDescription: string;
  setTaskDescription: (value: string) => void;
  saveTask: () => void;
  taskModalSaving: boolean;
  editingTask: boolean;
};

function ModalContent({
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  saveTask,
  taskModalSaving,
  editingTask,
}: Props) {
  return (
    <>
      <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
        <Field className="wpqt-mb-3">
          <Label className="wpqt-block wpqt-text-sm/6 wpqt-font-medium wpqt-mb-2">
            Name
          </Label>
          <Input
            className={clsx(
              "wpqt-block wpqt-w-full wpqt-border-1 wpqt-rounded-lg wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6",
              "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25"
            )}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Field>
        <Field>
          <Label className="wpqt-block wpqt-text-sm/6 wpqt-font-medium wpqt-mb-2">
            Description
          </Label>
          <Textarea
            className={clsx(
              "wpqt-block wpqt-w-full wpqt-resize-none wpqt-border-1 wpqt-rounded-lg wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6",
              "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25"
            )}
            rows={3}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </Field>
      </Fieldset>
      <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
        <Button
          className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-py-1.5 wpqt-px-3 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white data-[open]:wpqt-bg-gray-700"
          onClick={saveTask}
        >
          {taskModalSaving
            ? "Saving..."
            : editingTask
            ? "Edit task"
            : "Add task"}
        </Button>
      </div>
    </>
  );
}

export default ModalContent;
