import {
  Fieldset,
  Field,
  Input,
  Label,
  Textarea,
  Button,
  DialogTitle,
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
import { Task } from "../../../types/task";

type Props = {
  addTask: (name: string, description: string) => void;
  taskModalSaving: boolean;
  editTask: (task: Task) => void;
};

const TaskModalContent = forwardRef(
  ({ addTask, taskModalSaving, editTask }: Props, ref) => {
    const {
      state: { taskToEdit },
    } = useContext(ModalContext);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
      if (taskToEdit) {
        setTaskName(taskToEdit.name);
        setTaskDescription(taskToEdit.description);
      }
    }, [taskToEdit]);
    const editingTask = !!taskToEdit;

    const saveTask = () => {
      editingTask
        ? editTask({
            ...taskToEdit,
            name: taskName,
            description: taskDescription,
          })
        : addTask(taskName, taskDescription);
    };

    const clearContent = () => {
      setTaskName("");
      setTaskDescription("");
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
          {editingTask ? "Edit task" : "Add task"}
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
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Field>
        </Fieldset>
        <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
          <Button
            className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[open]:wpqt-bg-gray-700 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white"
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
  },
);

export { TaskModalContent };
